import sparknestLogo from '../assets/sparknest logo.png';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-white p-3 sm:py-5 z-50">
            <div className="container w-full max-w-7xl mx-auto flex flex-col items-center justify-between px-4">
                <div className='grid w-full justify-between md:grid-cols-1 mb-4 md:mb-0'>
                    <div className='flex items-center mb-4'>
                        <img src={sparknestLogo} alt="Sparknest Logo" className='w-14 h-11 object-contain' />
                        <h1 className='sm:text-[1.25rem] text-lg font-bold whitespace-nowrap self-end'>Kakashi's Blog</h1>
                    </div>
                    <div className='grid grid-cols-2 text-left sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        <div className='flex flex-col space-y-4'>
                            <h2 className='text-base font-medium leading-tight tracking-wider'>ABOUT</h2>
                            <a href='https://www.100jsprojects.com' className='text-[12px] hover:underline'>100+ Projects</a>
                            <a href="https://www.linkedin.com/in/dhanushmathan2394/" className='text-[12px] hover:underline'>Dhanush's Blog</a>
                        </div>
                        <div className='flex flex-col space-y-4'>
                            <h2 className='text-base font-medium leading-tight tracking-wider'>FOLLOW US</h2>
                            <a href='https://github.com/dhanushmathan' className='text-[12px] hover:underline'>Github</a>
                            <a href="https://www.linkedin.com/in/dhanushmathan2394/" className='text-[12px] hover:underline'>Discord</a>
                        </div>
                        <div className='flex flex-col space-y-4'>
                            <h2 className='text-base font-medium leading-tight tracking-wider'>LEGAL</h2>
                            <span className='text-[12px]'>Privacy Policy</span>
                            <a href="#" className='text-[12px] hover:underline'>Terms & Conditions</a>
                        </div>
                    </div>
                </div>
                <hr className="w-full border-t border-gray-700 my-4" />
                <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                    <div className="font-semibold sm:text-lg text-[11px] md:text-sm mb-3">
                        <span>© {new Date().getFullYear()} Blog WebApp. All rights reserved.</span>
                    </div>
                    <div className="flex space-x-6 items-center justify-center">
                        <a href="https://www.linkedin.com/in/dhanushmathan2394/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                            </svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M7.465 1.066C8.638 1.012 9.012 1 12 1s3.362.013 4.534.066s1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12s-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.4 5.4 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066s-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.4 5.4 0 0 1-1.949-1.268a5.4 5.4 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12s.013-3.362.066-4.534s.24-1.972.511-2.672a5.4 5.4 0 0 1 1.27-1.948a5.4 5.4 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511m8.98 1.98c-1.16-.053-1.508-.064-4.445-.064s-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.4 3.4 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445s.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064s3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445s-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.4 3.4 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379m-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986M8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996m10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89" clipRule="evenodd"></path></svg>
                        </a>
                        <a href="https://github.com/dhanushmathan" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-blue-700 transition-colors">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;