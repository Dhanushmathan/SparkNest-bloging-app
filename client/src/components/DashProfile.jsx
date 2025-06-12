import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, updateProfileSuccess } from '../redux/user/userSlice';

const DashProfile = () => {

  const { currentUser } = useSelector((state) => state.user);

  const [url, setUrl] = useState('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1170&q=80');
  const categories = ['nature', 'sea', 'mountains', 'forest', 'desert', 'sky'];
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(currentUser.profilePicture || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png");
  const [loading, setLoading] = useState(false);

  const [blockQuotes, setBlockQuotes] = useState(null);

  const fetchImage = async () => {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const res = await fetch(`https://api.unsplash.com/photos/random?query=${cat}&client_id=${accessKey}`);
    if (!res.ok) {
      throw new Error('Failed to fetch image');
    }
    const data = await res.json();
    setUrl(data.urls?.regular || '');
  };

  useEffect(() => {
    fetchImage();
    randomQuotes();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  useEffect(() => {
    console.log("ImageFile Updated");
    uploadImage();
  }, [imageFile])

  const uploadImage = async () => {

    if (!imageFile) {
      console.error('❌ No image file selected');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', imageFile);

    const userId = currentUser.user?.id || currentUser._id || currentUser.id;

    try {
      const res = await fetch(`/api/users/upload-profile/${userId}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setImageFileURL(data.user.profilePicture);
      dispatch(signInSuccess(data.user));
      dispatch(updateProfileSuccess(data.user));
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const randomQuotes = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setBlockQuotes(data.slip.advice);
        return data;
      })
      .catch((err) => {
        console.error("Error This URL", err);
      });
  }

  return (
    <div className="w-full mx-auto bg-gray-50 md:p-2 shadow-xl">
      <div className='bg-white rounded-xl'>
        <div className="mb-2 relative">
          <img
            src={url}
            alt="nature"
            className="w-full h-36 md:h-52 object-cover md:rounded-xl"
          />
          <div className="flex items-end justify-between px-3 py-2.5 md:px-10 md:py-[5px] absolute bottom-0 left-0 w-full">
            <div className="relative group">
              <img
                src={imageFileURL?.includes('blob') ? imageFileURL : `${currentUser.profilePicture?.replace('/upload/', '/upload/q_auto,f_auto/')}`}
                alt="profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg -mb-14 cursor-pointer"
              />
              {
                loading && (
                  <div className='absolute inset-0 transform translate-x-1/3 translate-y-1/2'>
                    <svg className='text-white'
                      xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
                      <circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle>
                    </svg>
                  </div>
                )
              }
              <input
                type="file"
                id='profileUpload'
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor='profileUpload'
                className="absolute cursor-pointer left-[99px] md:left-[125px] -bottom-10 md:-bottom-9 hover:bg-blue-700 rounded-full p-1 transition-colors border border-blue-400 flex items-center justify-center
                  opacity-0 group-hover:opacity-100 bg-white/80 duration-200"
                style={{ pointerEvents: 'auto' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className='hover:text-white' width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18q2.075 0 3.538-1.462Q17 15.075 17 13q0-2.075-1.462-3.538Q14.075 8 12 8Q9.925 8 8.463 9.462Q7 10.925 7 13q0 2.075 1.463 3.538Q9.925 18 12 18Zm0-2q-1.25 0-2.125-.875T9 13q0-1.25.875-2.125T12 10q1.25 0 2.125.875T15 13q0 1.25-.875 2.125T12 16Zm6-6q.425 0 .712-.288Q19 9.425 19 9t-.288-.713Q18.425 8 18 8t-.712.287Q17 8.575 17 9t.288.712Q17.575 10 18 10ZM4 21q-.825 0-1.412-.587Q2 19.825 2 19V7q0-.825.588-1.412Q3.175 5 4 5h3.15L8.7 3.325q.15-.15.337-.238Q9.225 3 9.425 3h5.15q.2 0 .388.087q.187.088.337.238L16.85 5H20q.825 0 1.413.588Q22 6.175 22 7v12q0 .825-.587 1.413Q20.825 21 20 21Z" /></svg>
              </label>
            </div>
            <div className='absolute cursor-pointer right-[17px] -bottom-[50px] md:right-[35px] md:-bottom-[50px] hover:bg-gray-300 rounded-full p-2 transition-colors border border-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" className='w-7 h-7' viewBox="0 0 24 24" id="edit-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor" width="28" height="28">
                <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-14 md:mt-20 px-4 md:px-8 md:py-2 space-y-1.5">
          <h2 className="text-2xl font-semibold">{currentUser.username}</h2>
          <p className="text-gray-600">Full Stack Developer | MERN Stack Developer | DotNet</p>
          <p className='text-gray-500 text-sm'>Contact Us : {currentUser.email}</p>
          <h2 className='my-5 font-medium text-gray-700'>
            {`"${blockQuotes}"`}
          </h2>
        </div>
      </div>

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

          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle><circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0" /></circle></svg>

        ))} */}
      </div>
    </div>
  );
};

export default DashProfile;