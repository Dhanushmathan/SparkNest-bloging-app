import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DashProfile = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [url, setUrl] = useState();
  const categories = ['nature', 'sea', 'mountains', 'forest', 'desert', 'sky'];
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchImage = async () => {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const res = await fetch(`https://api.unsplash.com/photos/random?query=${cat}&client_id=${accessKey}`);
    if (!res.ok) {
      throw new Error('Failed to fetch image');
    }
    const data = await res.json();
    setUrl(data.urls?.regular || '');
  };

  useEffect(() => { fetchImage(); }, []);

  return (
    <div className="w-full mx-auto bg-gray-50 p-2 shadow-xl">
      <div className="bg-white mb-2 relative rounded-xl">
        <img
          src={url}
          alt="nature"
          className="w-full h-52 object-cover rounded-xl"
        />
        <div className="flex items-end justify-between px-10 py-[140px] absolute bottom-0 left-0 w-full  ">
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg -mb-14"
          />
          <div className='absolute cursor-pointer right-[35px] bottom-[85px] hover:bg-gray-300 rounded-full p-2 transition-colors'>
            <svg xmlns="http://www.w3.org/2000/svg" className='' viewBox="0 0 24 24" id="edit-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor" width="28" height="28">
              <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
            </svg>
          </div>
        </div>
        <div className="mt-20 px-8 py-2 space-y-1.5">
          <h2 className="text-2xl font-semibold">{currentUser.username}</h2>
          <p className="text-gray-600">Full Stack Developer | MERN Stack Developer | DotNet</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around mt-8 bg-gray-100 rounded-lg p-6 text-center text-base">
        <div>
          <p className="text-xl font-bold">2</p>
          <p>Blogs</p>
        </div>
        <div>
          <p className="text-xl font-bold">30</p>
          <p>Likes</p>
        </div>
        <div>
          <p className="text-xl font-bold">12</p>
          <p>Comments</p>
        </div>
      </div>

      {/* Blog posts */}
      <div className="mt-8 space-y-4">
        {/* {user.blogs.map((blog, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-xl shadow-sm border"
          >
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{blog.date}</p>
            <p className="text-gray-700">{blog.excerpt}</p>
            <div className="mt-2 flex gap-2">
              <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default DashProfile;