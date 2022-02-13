import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
	posts: [Post];
}

export default function Home({ posts }: Props) {
  
	return (
		<div className="max-w-7xl mx-auto">
			<Head>
				<title>MtotoSharp Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<div className="flex justify-between items-center bg-purple-400 border-y border-black py-10 lg:py-1">
				<div className="px-10 space-y-5">
					<h1 className="text-6xl max-w-xl font-serif">
						<span className="underline decoration-black decoration-4">
							MtotoSharp
						</span>
						A Dose For A Brighter Morning
					</h1>
					<h2>
						children and parenting , psychology,love ,Gossip, Celebrity,
						Politics And Education
					</h2>
				</div>
				<img className="hidden md:inline-flex h-32 lg:h-full" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEUSEA7///8AAABVVVRubm3S0tLe3t6kpKOfnp4PDQsIBAAMCQYFAADy8vLJyMj8/Pzq6upbWlk7Ojm1tbWCgYHk5ORRUE96enlMS0oiIB+JiYhAPz6trKw2NTRFREPY2Nh1dHS9vb2Yl5eIiIfDw8IsKypnZmUbGhgnJSSamZmxsbB/PB6xAAAGkElEQVR4nO2d6XbaMBCFjRJCzJqNbM2+Ne37P2AhFGTsGevK2DA6596fJbX1YXs0vhoNWUZRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRFEVRVFm5wzXa8Vxj+EytoK2Uf54fwXrcDdFdw2dqEdHd9HCd7XTi4SN+pkMR9r52ObN7OAjh+CmG8Hknwhl8nn6bD6J7iUG8bX7qiLtl2ibg4synEYQ7nNs9oyd5dXmLfMtTTyMQ75qGUzzOXLYNuJgRz3DCv00vIhxnHtq9RX80zPAY0Gv4BedonBl0ALj4fm9xwtNmI0DjzFsngFFxbtbsIroT6Oj3HQEuBjCAEa+aDAKMM++dAS4Q+yhho9TN/UUOfdMhYExAPY4fBxZnGhw4RuM7NKCexA8Ees53SnqhUVyDhA1SNyTOnHcNuBjGFUgYnboNLzo4aBPBacfnMPLAQJz5sw9COKBexo0md8Axu8llqkOZYIhxsz50+++HMBt/YwE1LnWD8pk9EaIBNSp1GwNxZn+E6KMYkz9i+cz+CO8hwgk+HvC9aX+EXxBhRIYFvrfsj/AYI8RTN/C9yRxh7xocEZLP2CREsywszlgk7D1CqRuUzxglfIWGBKfzBgl7GWKdgnHGJiEypvGvNo/WiiIIkfzbXSZNGE7d4DhzEMJ5cFDh1M3HmaDPdQDCaXjB5iU0Kh9ngunuAQj7Yat/HhiVjzOT4ELsIQhd+D4N+GM+zpwGv66DEIZXh+tXowtx5u7IJCHg2tSmbj7O9J1RwvDbcG3q5uPMsVFCZDb7raduPs7MnFFCZM2tZmA+zjyYJRzlQUI9dSvcAY9Dq4RIWqkuS/s487y4G6wSAku3aurm48yNYUKk1kZZuPXlZEv72DBh49TN3+DLEhy7hMg7upi6FeLMxdg2YdghFlM3977++MdZNUyYARUMv8bCcTZp+5V5wrBZJqRuhbLVnwnTMiGysFJN3XycWa0XWybM3J8gYaWcsBBnbu0TIvl3OXXzceb/XGKaECnRKKduPs7cp0A4ugsSTrYvYjnOWCfM3EcQcTt183HmY/0w2yYErPmtgsXCk3uUBiFSvlAsu/NxZgNunvA8SFjca+LjzFsqhBlgnT5tUrexfx/J16mAfcKwdfrhA9Pr+t/8Srh5wgywTr//X69CnPlKiTBsna73mvg/LRgc9gmR/Hs9uW+e2dOUCBHrdFUDW/A9CnukEiAE8u9VwaKPM1uhyj4hYp0u3+YL38RxYoSAdbrMYMQ4kwYhYp0uZgcfZwbpEYbLh59dIc58F62NJAgR6/RJjjPJEIat06mPMy8JEiLW6ca1KtW6p0KI1hn2KvZbIoTwXt5epYQhEcLMvaGA5TLwVAjxQrzyVtpUCPHdbRWLOBXC0W8MsLK5LRlCxDpd6qm83pYOIVbVXN1ukg4htvOruq0+JcKwdSpVESVEiFinwppwUoRh61TYzZ4SYdg6ldpKpEUYsk6lTQpJEQbzb6laMSnCkHX6IWYKSRGORrVDFYvALBFu5jt9C2WtdSq3r7FEuHHUdMLhZ81I5YpaS4Qbu6lmL3OddToWS9stEfowom++q6k6Va68JUI/n9dsvtM7BCqNguwQFqfzmd5zVrVOtapvM4Tbt19NL0/NOtWanlghLLcX1DvtaNap1jjSCGG1o5neIU5O3fQ8yAahMAmoGwxl61TtB2KDUGzV+i3UcC8lWqcz/ZJbIJR3cU+0WVGyTvVRhgkb9tSMkFNcNO3RkqpO9S5n4ZW5Lhqzbg9YfevTLoxfDF2rbnYJLpGrN0tLymsMJmVjU7XxjL55HWnhMu0WsXpBCnpSMrGSdao3AMN6R/S7RKxfNptl4vNVtk61JylHm2N0iBiKA3P51KU7W9nXnYNrHb3lg7zrry9ogHVvtD+S34m2rVPlfTKPaRfeEeIIKB6VO1Nu/Ue5v3AU4PJr6gIRagcv5mNb1ql4J+d4f+LuEMFmXBcCYtE6Fd9DRngz/e4Q0RKSiXTmgudRWRT9AUS7RBU0bxkxnDCudSLcht46lXYDNwJcHiqyxW2t8A7Qcg+MzVQnvEkOgYU4UWctIkb9LIJkTW2s0+oFzocxx95GHLZ2o0Iruv7E0kVcTQbSoig80Vclrn0cinDlXQl9Im0Qji4Gp7hEA9W9LT6REgI3mJ801LzFF/5RxC92Kb+kpX4SdejufrOLoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKoiiKolrTP6ZlXmnI8lFtAAAAAElFTkSuQmCC" />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 px-2 lg:px-6">
				{posts.map((post) => (
					<Link key={post._id} href={`/post/${post.slug.current}`}>
						<div className=" group cursor-pointer border rounded-lg overflow-hidden mt-2" >
							<p className="text-lg font-bold mx-auto bg-yellow-600 text-white items-center">
								{post.title}
							</p>
							<img
								className="h-60 w-full  object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
								src={urlFor(post.mainImage).url()!}
								alt=""
							/>
							<div className="flex justify-between p-5 bg-white">
								<div>
									<p className="text-s">{post.description}</p>
									<p className="text-xs font-semibold">by {post.author.name}</p>
								</div>
								<img
									className="h-12 w-12 rounded-full"
									src={urlFor(post.author.image).url()!}
									alt=""
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export const getServerSideProps = async () => {
	const query = `*[_type == "post"] {
    _id,
    slug,
    mainImage,
    title,
    description,
    author->{
    name,
    image,
  }
  }`;
	const posts = await sanityClient.fetch(query);

	return {
		props: {
			posts,
		},
	};
};
