import React from 'react';
import bloggerAB from '../assets/blogger.png'
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center lg:space-x-20 font-poppins p-3'>
      {/* Left Side with Abstract Background Image */}
      <div className='hidden sm:flex flex-col items-center lg:w-1/2 w-full h-80'>
        <img
          src={bloggerAB}
          alt='Abstract'
          className='w-[85%]'
        />
      </div>

      {/* Right Side with Sign Up Form */}
      <div className='flex flex-col items-center w-full lg:w-1/2 max-w-md mr-0 sm:mr-16 mt-5'>
        <form className='w-full'>

          <div className='mb-2 text-center'>
            <h1 className='sm:text-3xl text-xl font-bold mb-2'>Sign Up</h1>
            <p className="text-gray-600 sm:text-sm text-xs">Continue with Google or enter your details</p>
          </div>

          <div className='mb-4'>
            <input type='text' id='name' className='mt-1 block w-full border-b border-blue-700 shadow-sm p-2 outline-none' placeholder='Username' />
          </div>

          <div className='mb-4'>
            <input type='email' id='email' className='mt-1 block w-full border-b border-blue-700 shadow-sm p-2 outline-none' placeholder='your@gmail.com' />
          </div>

          <div className='mb-4'>
            <input type='password' id='password' className='mt-1 block w-full border-b border-blue-700 shadow-sm p-2 outline-none' placeholder='Password' />
          </div>

          <button type='submit' className='w-full font-semibold bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-1 cursor-pointer'>Sign Up</button>

          <p className="mt-4 text-center text-gray-600 sm:text-sm text-xs">
            Don't have an account? <Link to="/sign-in" className="text-blue-600 hover:text-blue-700 font-bold">Sign In</Link>
          </p>

        </form>
      </div>

      <div className='block sm:hidden mt-5 lg:w-1/2 w-full h-80'>
        <img
          src={bloggerAB}
          alt='Abstract'
          className='w-[85%]'
        />
      </div>
    </div>
  )
}

export default SignUp;