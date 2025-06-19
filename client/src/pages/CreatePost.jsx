import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePostModal = ({ onClose }) => {

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [imageUpload, setImageUpload] = useState();

    const handleClose = () => {
        onClose();
        const currentUrl = window.location.pathname + window.location.search;
        const cleanedUrl = currentUrl.replace(/\/overlay\/create-posts$/, '');

        window.history.replaceState(null, '', cleanedUrl);
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') handleClose();
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleClose]);


    return (
        <div className="fixed inset-0 z-50 p-2 lg:p-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-[100%] max-w-3xl h-[80%] rounded-lg shadow-lg p-3">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-2xl text-gray-500 cursor-pointer hover:text-black"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-2 mb-4">
                    <img
                        src={currentUser.profilePicture}
                        alt="Profile"
                        className="w-14 h-14 rounded-full object-cover cursor-pointer"
                    />
                    <div>
                        <h3 className="font-semibold text-xl">{currentUser.username}</h3>
                        <p className="text-xs text-gray-500">Post to Anyone ⬇️</p>
                    </div>
                </div>

                <form action="" className="space-y-3 flex flex-col">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            className="px-2 py-1.5 rounded-sm outline-none border border-gray-600 w-2/3"
                            placeholder="Title"
                            id="title"
                            required
                        />
                        <select
                            className="px-2 py-1.5 rounded-sm outline-none border border-gray-600 w-1/3"
                        >
                            <option value="uncategorized">Select a Category</option>
                            <option value="javascript">JavaScript</option>
                            <option value="reactjs">ReactJS</option>
                            <option value="Angular">Angular</option>
                            <option value="nextjs">NextJS</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select>
                    </div>

                    <textarea
                        placeholder="What do you want to talk about?"
                        className="h-28 resize-none text-gray-800 placeholder-gray-500 text-sm rounded-sm outline-none border border-gray-600"
                        id="desc"
                        required
                    ></textarea>
                </form>

                <div className="mt-2 border border-red-600">

                </div>

                <div className="mt-40 flex justify-between">
                    <label htmlFor="postImage" className="flex items-center bg-blue-700 hover:bg-blue-600 rounded-md px-2 text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-10 mr-1.5 cursor-pointer text-gray-200" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="2 4" strokeDashoffset="6" d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"><animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0" /></path><path strokeDasharray="32" strokeDashoffset="32" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.4s" values="32;0" /></path><path strokeDasharray="10" strokeDashoffset="10" d="M12 16v-7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0" /></path><path strokeDasharray="6" strokeDashoffset="6" d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0" /></path></g></svg>
                        <span>Upload Image</span>
                        <input type="file" accept="image/*" className="hidden" id="postImage" />
                    </label>
                    <button
                        className="bg-blue-700 hover:bg-blue-600 text-gray-200 px-6 py-0.5 rounded-full text-sm cursor-pointer"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;