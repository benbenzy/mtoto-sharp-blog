import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface Props {
	post: Post;
}
interface forminput {
	_id: string;
	name: string;
	comment: string;
	email: string;
}

function Post({ post }: Props) {
    const [submitted,setSubmitted]= useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<forminput>();

    const onsubmit:SubmitHandler<forminput>=async(data)=>{
        await fetch('/api/createComment',{
            method:'POST',
            body:JSON.stringify(data),
        }).then((res)=>{
            setSubmitted(true)
            console.log(res.body)
        }).catch((error)=>{
            if(error){
                setSubmitted(false)
            }
            console.log(error)})       

    }

	return (
		<main>
			<Header />
			<img
				src={urlFor(post.mainImage).url()!}
				alt=""
				className="w-full h-40 object-cover"
			/>
			<article className="max-w-3xl mx-auto p-5">
				<h1 className="text-4xl mt-10 mb-3 justify-center">{post.title} </h1>
				<h2 className="text-xl font-light text-gray-500 mb-2">
					{post.description}
				</h2>
				<div className="flex items-center space-x-2">
					<img
						className="h-10 w-10 rounded-full "
						src={urlFor(post.author.image).url()!}
						alt=""
					/>
					<p className="font-xl text-sm ">
						{" "}
						by{" "}
						<span className="text-green-500 font-bold italic capitalize">
							{post.author.name}
						</span>
						on {new Date(post._createdAt).toDateString()}
					</p>
				</div>
				<div className="mg-t-10 ">
					<PortableText
						dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
						projectId={process.env.SANITY_PROJECT_ID}
						content={post.body}
						serializers={{
							h1: (props: any) => (
								<h1 className="text-2xl font-bold my-5 " {...props} />
							),
							h2: (props: any) => (
								<h2 className="text-xl font-bold my-5" {...props} />
							),
							li: ({ children }: any) => (
								<li className="ml-4 list-disc ">{children}</li>
							),
							link: ({ href, children }: any) => (
								<a className="text-blue-500 hover:underline">{children} </a>
							),
						}}
					/>
				</div>
			</article>
			<hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
            {submitted?(<div className="py-10 my-10 bg-yellow-300 text-white max-w-2xl mx-auto">
                <h3 className="text-3xl font-bold ">thank you for review</h3>
            </div>):(
			<form action="" onSubmit={handleSubmit(onsubmit)} className="flex flex-col p-5 max-w-2xl mb-10 mx-auto">
				<h3 className="text-3xl font-bold">Any review for this article ?</h3>
				<input {...register("_id")} type="hidden" name="_id" value={post._id} />
				<label className="black mb-5 " htmlFor="">
					<span className="text-gray-700 ">Name</span>
					<input
						{...register("name", { required: true })}
						className="shadow border rounded py-2 px-3 form-input focus:ring multiline-none mt-1 block w-full ring-yellow-300"
						type="text"
						placeholder="enter name"
					/>
                     {errors.name&&(
                        <span className="text-red-400 ">name field required</span>
                    ) }
				</label>
				<label className="black mb-5 " htmlFor="">
					<span className="text-gray-700">Email</span>
					<input
						{...register("email", { required: true })}
						className="shadow border rounded py-2 focus:ring multiline-none px-3 form-input mt-1 block w-full ring-yellow-300"
						type="email"
						placeholder="johndoe@gmail.com"
					/>
                     {errors.email&&(
                        <span className="text-red-400 ">email field required</span>
                    ) }
                   
				</label>
				<label className="black mb-5 " htmlFor="">
					<span className="text-gray-700">Comment</span>
					<textarea
						{...register("comment", { required: true })}
						className="
             shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-300 focus:ring multiline-none"
						placeholder="comment"
						rows={8}
					/>
                     {errors.comment&&(
                        <span className="text-red-400 ">comment is empty</span>
                    ) }
				</label>
                <div className="flex flex-col p-5">
                    
                   
                   
                </div>
                <input type="submit" 
                className="bg-yellow-400 hover:bg-yellow-600 focus:shadow-outline
                 focus:outline-none text-white font-bold cursor-pointer rounded px-4" />
			</form>
            )}

            {/**comments */}
            <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
                <h3 className="text-4xl capitalize">comments</h3>
                <hr className="pb-2 " />
                {post.comments.map((comment)=>(
                    <div key={comment._id}>
                        <p className="">
                            <span className="text-yellow-500 capitalize">{comment.name}: </span>{comment.comment}
                        </p>
                    </div>
                ))}
            </div>
		</main>
	);
}
export default Post;

export const getStaticPaths = async () => {
	const query = `*[_type == "post"]{
         _id,
         slug{
             current
         }
     }`;
	const posts = await sanityClient.fetch(query);
	const paths = posts.map((post: Post) => ({
		params: {
			slug: post.slug.current,
		},
	}));
	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == 'post'&& slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
            name,
            image
        },
        'comments': *[_type == "comment" && post._ref ==^._id  && approved == true ],
        description,
        mainImage,
        slug,
        body
    }
    `;

	const post = await sanityClient.fetch(query, {
		slug: params?.slug,
	});
	if (post) {
		return {
			props: {
				post,
			},
			revalidate: 60 * 60 * 24 * 3,
		};
	} else {
		return {
			notFound: true,
		};
	}
};
