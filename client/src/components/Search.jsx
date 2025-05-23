import React from 'react'
import { Link } from 'react-router-dom';

const Search = () => {
  return (
    <div className='px-2 py-2 font-poppins shadow-md'>
      <div className='flex flex-row space-x-4'>
        <button className='cursor-pointer'>
          <Link to='/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M19 12h-13.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"></animate></path><path strokeDasharray="10" strokeDashoffset="10" d="M5 12l5 5M5 12l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="10;0"></animate></path></g></svg>
          </Link>
        </button>
        <input type="search" placeholder='Search...' className='w-full outline-none' />
      </div>
    </div>
  )
}

export default Search;