import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutSuccess } from "../redux/user/userSlice";

const DashSidebar = () => {

    const location = useLocation();
    const [tab, setTab] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef();
    const [showModel, setShowModel] = useState(false);

    const { currentUser, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.addEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDeleteUser = async () => {
        setShowModel(false);
        try {
            dispatch(deleteUserStart());

            const userId = currentUser.user?.id || currentUser._id || currentUser.id;
            const res = await fetch(`/api/users/delete-user/${userId}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess(data));
            }

        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/users/signout', {
                method: 'POST',
            });
            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="">
            <div className="md:hidden w-full bg-gray-200 z-40 flex items-center px-2 py-2 shadow">
                <button
                    type="button"
                    aria-label="Open sidebar"
                    className="text-gray-700 focus:outline-none cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span className="ml-3 font-semibold">Dashboard</span>
            </div>
            <div ref={navRef} className={`fixed inset-y-0 ${isOpen ? 'top-[91px]' : 'top-12'} left-0 z-30 ${isOpen ? 'w-[200px] md:w-64' : 'w-0 md:w-64'} md:static md:h-screen h-full md:bg-gray-200 text-gray-800 flex flex-col transition-all duration-300 shadow-lg md:shadow-none overflow-hidden ${isOpen ? 'bg-gray-200' : 'bg-transparent'} md:bg-gray-200`}>
                <aside className={`flex-1 grid md:block p-4 ${!isOpen && 'hidden md:block'}`}>
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
                    <div className="p-2 md:p-4 border-t border-gray-300 mt-8 flex flex-col items-start">
                        <a href="#" className="text-center font-medium text-gray-600 hover:text-gray-800" onClick={handleSignout}>
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
                        <a
                            href="#"
                            className="mt-6 text-red-600 hover:text-red-800 font-medium transition"
                            onClick={() => setShowModel(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2 align-text-bottom" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" /></svg>
                            Delete Account
                        </a>
                    </div>
                </aside>
            </div>
            {
                error &&
                <div
                    id="toast-bottom-left"
                    className={`fixed flex items-center w-full max-w-xs md:max-w-md p-4 space-x-5 text-red-800 border border-red-700 bg-red-200 divide-x rtl:divide-x-reverse divide-gray-200 rounded-md shadow-sm bottom-5 right-5 transition-all duration-500 transform ${showToast ? 'animate-toast-in' : 'animate-toast-out'}`}
                    role="alert"
                >
                    <div className="text-sm md:text-base font-normal">{error}</div>
                </div>
            }
            {showModel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 md:p-0">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-md">
                        <button
                            className="text-gray-400 hover:text-gray-600 flex justify-self-end cursor-pointer"
                            aria-label="Close"
                            onClick={() => setShowModel(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto text-gray-500" width="5em" height="5em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0M8.75 5a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0z" clipRule="evenodd" /></svg>
                        <p className="my-5 text-center font-medium text-lg">Are you sure you want to delete this account?</p>
                        <div className="flex justify-center space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                                onClick={() => setShowModel(false)}
                            >
                                No, cancel
                            </button>
                            <button ref={navRef}
                                className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
                                // Add your delete logic here
                                onClick={handleDeleteUser}
                            >
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashSidebar;