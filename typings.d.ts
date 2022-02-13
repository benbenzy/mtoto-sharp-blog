export interface Post{
    comments:Comment[];
    _id:string;
    _createdAt:string;
    title:string;
    author:{
        name:String;
        image:String;
    };
    description:string;
    mainImage:{
        asset:{
            url:string;
        };
    };
    slug:{
        current:string;
    };
body:[object];
}
export interface Comment {
    approved:boolean;
    _createdAt:string;
    comment:string;
    email:string;
    name:string;
    post:{
        _ref:string;
        _type:string;
    };
    _id:string;
    _rev:string;
    _type:string;
    _updatedAt:string;

}