import Link from 'next/link'
import React from 'react';

function Header() {
  return (
  <header className='flex justify-between p-5 max-w-7xl mx-auto'>
     <div className='flex items-center space-x-5'>
         <Link href="/">
          <img className=" h-24 w-56 object-contain cursor-pointer"
          src="https://lh3.googleusercontent.com/5z8FuJuWxfY6Pey8ePe7falQWjKZ5Oa07xuUEsimUKcnmSzTWbczCF8vlt7r5FxhHRdOI_6MjoaBRIyCn2NiuadvLM0_J6p2F_8RBoGoroins-L0fme0EcPa1AYLXVqweqWBbPKKEUJEJrCeHHXQvVchBI9eJ7fGgmNiNgqins7lh05MOb3XDbTAwcuK7_AmZ8VcLqUf_36n919z5bfjHoWL2y5V6VQlPjf0hXJBfncSHI-a7M7-GeoNZ4JWbwEtyRDghqovp6FxnTEnx8kUPug-Se3PJR4ptvdQyzayOhROZN00IX-ykU6opZYLCtYvwJ-cK2MjIFOmJfENr58bYgu6Eq2vua4ztPTwj14nKa7u3TRGwmi1MOxVXoA_9Oc-ort-Uo5pLt1vLQvCz_OCsuny_7fW2OA8mOqOCRpOnBiYQHmGVncnlCxt7cv8jkZkTolCCmw9qNZ46Fcl55ZFQAjs5Z_WCQByA8lf_M98mwDcliW7LrqagutIFBaN2NHrA7f8ZYSk7FaGs_pMiMFb0H6oT9_ToZ4b_2AoSH4Gi7v8kPTV4hkaXl1bT4cyo0E1lgY0HMJs44q5CcRbHIk3cS0otmRQKdNcJLiNypa-9TAUg7rnZU0aRlIk4v_bcnUo12mTRcsOCKjOhCiqPzRvxxsv62DzgCG5YkRfqBD2UAZBhVkY3tmVtECKAcaGmqQBD6KMZ7WpgWvKKGTX24x9mUKS=w1600-h668-no?authuser=1"
           alt=''/>
         </Link>
         
         <div className='hidden md:inline-flex items-center space-x-5'>
           <h3 className='cursor-pointer'>About</h3>
           <h3 className='cursor-pointer'> Contact</h3>
           <h3 className='text-white bg-green-600 px-4 py-1 rounded-full cursor-pointer'>Follow</h3>
         </div>
     </div>
     <div className='flex items-center space-x-5 text-green-600'>
         <h3 className='cursor-pointer'>Sign in</h3>
         <h3 className='border px-4 py-1 rounded-full border-green-600 cursor-pointer'>Get Started</h3>
     </div>
  </header>
  );
}

export default Header;
