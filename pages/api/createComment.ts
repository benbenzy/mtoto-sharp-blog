// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import  SanityClient  from '@sanity/client';

const config={
    dataset :process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId:"m4kgm4bq",
    apiVersion:'2021-10-21',
    useCdn:process.env.NODE_ENV==="production",
    token:process.env.API_TOKEN
};

const client =SanityClient(config)
type Data = {
  name: string
}

export default async function createeComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {_id,name,email,comment}= JSON.parse(req.body);
    try {
        await client.create({
            _type:"comment",
            post:{
                _type:"reference",
                _ref:_id
            },
            name,
            email,
            comment
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"could not submit comment",error})
        
    }
  res.status(200).json({ messsage: 'comment submitted' })
}
