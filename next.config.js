/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env:{
    dataset :process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId:process.env.SANITY_PROJECT_ID,
    apiVersion:'2021-10-21',
    useCdn:process.env.NODE_ENV==="production",
    token:process.env.API_TOKEN
  }
  
}

