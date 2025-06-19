import { useState } from "react";
import { useSelector } from "react-redux";
import CreatePostModal from "../pages/CreatePost";

const DashPost = () => {

    const { currentUser } = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false);

    const posts = [
        {
            id: 1,
            title: 'Mastering React in 2025',
            excerpt: 'A quick guide to mastering React and building powerful web apps.',
            author: 'Dhanush Mathan',
            date: 'June 16, 2025',
            image: 'https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png?f=webp&w=256',
        },
        {
            id: 2,
            title: 'Why Tailwind CSS is Taking Over',
            excerpt: 'Discover the power of utility-first design with Tailwind CSS.',
            author: 'Obito Uchiga',
            date: 'June 10, 2025',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5vjfJanFsa9sLPzuhAtjLuUKTen37v4JNUA&s',
        },
        {
            id: 3,
            title: 'Why JavaScript very popular',
            excerpt: 'JavaScript is very powerfull and popular script',
            author: 'Itachi Uchiga',
            date: 'June 20, 2025',
            image: 'https://img.icons8.com/color/512/javascript.png',
        },
        {
            id: 4,
            title: 'Why JavaScript very popular',
            excerpt: 'JavaScript is very powerfull and popular script',
            author: 'Itachi Uchiga',
            date: 'June 20, 2025',
            image: 'https://img.icons8.com/color/512/javascript.png',
        },
        {
            id: 5,
            title: 'Why JavaScript very popular',
            excerpt: 'JavaScript is very powerfull and popular script',
            author: 'Itachi Uchiga',
            date: 'June 20, 2025',
            image: 'https://img.icons8.com/color/512/javascript.png',
        },
        {
            id: 6,
            title: 'Why JavaScript very popular',
            excerpt: 'JavaScript is very powerfull and popular script',
            author: 'Itachi Uchiga',
            date: 'June 20, 2025',
            image: 'https://img.icons8.com/color/512/javascript.png',
        },
    ];

    const handleCreatePostClick = () => {
        const currentUrl = window.location.pathname + window.location.search;
        const newUrl = currentUrl.endsWith('/') ? currentUrl + 'overlay/create-posts' : currentUrl + '/overlay/create-posts';
        window.history.replaceState(null, '', newUrl);
        setShowModal(true);
    };

    return (
        <div className='w-full min-h-screen mx-auto p-4 bg-gray-100'>
            {
                currentUser.isAdmin && (
                    <button
                        onClick={handleCreatePostClick}
                        className='flex items-center justify-self-end cursor-pointer text-white bg-blue-700 hover:bg-blue-800 px-2 py-1.5 rounded-full'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 mr-1.5' viewBox="0 0 24 24" id="edit-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor" width="28" height="28">
                            <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
                        </svg>
                        <span>Create Post</span>
                    </button>
                )
            }

            {showModal && <CreatePostModal onClose={() => setShowModal(false)} />}

            <h1 className='text-center font-semibold text-3xl'>LATEST POSTS</h1>
            <div className='py-4 relative'>
                <span className="absolute left-1/4 top-1/2 transform -translate-y-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </span>
                <input
                    type="search"
                    className='mx-auto block w-1/2 pl-9 pr-4 py-2 border border-gray-700 shadow-lg outline-none rounded-full'
                    placeholder='Search posts...'
                    required
                />
            </div>
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    posts.map((post) => (
                        <div key={post.id} className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-95 duration-200">
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold">{post.title}</h2>
                                <p className="text-sm mt-2 text-gray-600">{post.excerpt}</p>
                                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                    <span>{post.author}</span>
                                    <span>{post.date}</span>
                                </div>
                                <button className="mt-4 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium transition">Read More</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default DashPost;