import React from 'react'
import { Link } from 'react-router-dom';
import sparknestLogo from '../assets/sparknest logo.png';
import { useState } from 'react';

const Header = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className='bg-white flex justify-between items-center sm:px-4 sm:py-1 px-2 py-1.5 font-poppins shadow-md space-x-2'>
            <div className='flex items-center'>
                <img src={sparknestLogo} alt="Sparknest Logo" className='w-14 h-11 object-contain hidden lg:block' />
                <Link to="/" className='sm:text-[1.25rem] text-lg font-bold whitespace-nowrap self-end'>
                    Kakashi's Blog</Link>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2 mr-3'>
                    {/* Desktop: Show input, Mobile: Hide input */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="hidden sm:block border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                window.location.href = '/search?q=' + encodeURIComponent(e.target.value);
                            }
                        }}
                    />
                    <button type="submit" className="cursor-pointer sm:hidden border border-gray-300 bg-gray-200 rounded-full p-1">
                        <Link to="/search">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.6em"
                                height="1.6em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                                ></path>
                            </svg>
                        </Link>
                    </button>
                    <button
                        className='sm:hidden block cursor-pointer border border-gray-300 bg-gray-200 rounded-full p-1'
                        onClick={() => setIsNavOpen(!isNavOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                    </button>
                </div>
                <nav className={`${isNavOpen ? 'block animate-slide-down sm:flex' : 'hidden'} absolute md:block sm:static top-12 left-0 w-full bg-white shadow-md sm:shadow-none sm:bg-transparent z-10 transition-all duration-300 ease-in-out`}>
                    <ul className='flex flex-col font-medium sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-5 p-4 sm:p-0 xl:space-x-8'>
                        <li className='hover:scale-105 transition-transform duration-200'>
                            <Link to="/" className='hover:text-emerald-700 text-[13px]'>Home</Link>
                        </li>
                        <li className='hover:scale-105 transition-transform duration-200'>
                            <Link to="/about" className='hover:text-emerald-700 text-[13px]'>About</Link>
                        </li>
                        <li className='hover:scale-105 transition-transform duration-200'>
                            <Link to="/projects" className='hover:text-emerald-700 text-[13px]'>Projects</Link>
                        </li>
                        <li className='hover:scale-105 transition-transform duration-200'>
                            <Link to="/dashboard" className='hover:text-emerald-700 text-[13px]'>Dashboard</Link>
                        </li>
                        <li className='block sm:hidden lg:block border border-gray-300 bg-gray-200 hover:bg-gray-400 px-5 py-2 sm:px-2.5 sm:py-1 rounded-full'>
                            <Link to="/sign-in" className='text-[13px]'>Sign In</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;