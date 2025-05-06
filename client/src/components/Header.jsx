import React from 'react'
import { Link } from 'react-router-dom';
import sparknestLogo from '../assets/sparknest logo.png';
import { useState } from 'react';
import Search from './Search';

const Header = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className='bg-white flex justify-between items-center sm:px-4 sm:py-3 px-2 py-1.5 font-poppins shadow-md space-x-2'>
            <div className='flex items-center'>
                <img src={sparknestLogo} alt="Sparknest Logo" className='w-14 h-11 object-contain hidden lg:block' />
                <Link to="/" className='sm:text-[1.40rem] text-lg font-bold whitespace-nowrap self-end'>
                    Kakashi's Blog</Link>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <Search />
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
                            <Link to="/" className='hover:text-emerald-700'>Home</Link>
                        </li>
                        <li className='hover:scale-105 transition-transform duration-200'>
                            <Link to="/about" className='hover:text-emerald-700'>About</Link>
                        </li>
                        <li className='hover:scale-105 transition-transform duration-200'>
                            <Link to="/projects" className='hover:text-emerald-700'>Projects</Link>
                        </li>
                        <li className='hover:scale-105 transition-transform duration-200'>
                            <Link to="/dashboard" className='hover:text-emerald-700'>Dashboard</Link>
                        </li>
                        <li className='block sm:hidden lg:block bg-gray-200 px-5 py-2 sm:px-2.5 sm:py-1.5 rounded-full'>
                            <Link to="/sign-in">Sign In</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;