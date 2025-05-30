import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {

    const location = useLocation();
    const [tab, setTab] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (

        <div className={`${isOpen ? 'w-[200px] md:w-64' : 'min-w-[50px]'} h-full`}>
            <div className={`fixed inset-y-0 top-12 left-0 z-30 ${isOpen ? 'w-[200px] md:w-64' : 'w-[40px] md:w-64'} md:static md:h-screen h-full md:bg-gray-200 text-gray-800 flex flex-col transition-all duration-300 shadow-lg md:shadow-none overflow-hidden`}>
                {/* Mobile sidebar toggle button */}
                <div className="md:hidden flex items-center justify-between p-2">
                    <button
                        type="button"
                        aria-label="Open sidebar"
                        className="text-gray-700 focus:outline-none"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        {/* Sidebar (hamburger) icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <aside className={`flex-1 grid md:block p-4 ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="space-y-4">
                        <li className="flex items-center px-2 py-2 rounded hover:bg-gray-300 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2 align-text-bottom" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"></path></svg>
                            <span>
                                Home
                            </span>
                        </li>
                        <li className="flex items-center px-2 py-2 rounded hover:bg-gray-300 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2 align-text-bottom" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21V3h18v18zm15-4H6v1.5h12zM6 15.5h12V14H6zM6 12h12V6H6zm0 5v1.5zm0-1.5V14zM6 12V6zm0 2v-2zm0 3v-1.5z"></path></svg>
                            <span>
                                Posts
                            </span>
                        </li>
                        <li className={`flex items-center px-2 py-2 rounded hover:bg-gray-300 transition ${tab === 'profile' ? 'bg-gray-300' : ''}`}>
                            <Link to={`?tab=profile`} className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2 align-text-bottom" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path></svg>
                                <span>
                                    Profile
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <div className="p-4 border-t border-gray-300 mt-8">
                        <a href="#" className="block text-center text-gray-600 hover:text-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block w-5 h-5 mr-2 align-text-bottom"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                            </svg>
                            Sign Out
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default DashSidebar;