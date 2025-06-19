import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, updateFailure, updateProfileSuccess, updateStart, updateSuccess } from '../redux/user/userSlice';

const DashProfile = () => {

  const { currentUser, error: errorMessage } = useSelector((state) => state.user);

  const [url, setUrl] = useState('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1170&q=80');
  const categories = ['nature', 'sea', 'mountains', 'forest', 'desert', 'sky'];
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(currentUser.profilePicture || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png");
  const [loading, setLoading] = useState(false);

  const [blockQuotes, setBlockQuotes] = useState(null);

  const [formData, setFormData] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showToast, setShowToast] = useState(false);

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

    if (updateUserSuccess) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        setTimeout(() =>
          setUpdateUserSuccess(null), 500);
      }, 5000);
      return () => clearTimeout(timer);
    }

    if (updateUserError) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        setTimeout(() =>
          setUpdateUserError(null), 500);
      }, 5000);
      return () => clearTimeout(timer);
    }

  }, [imageFile, updateUserSuccess, updateUserError])

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

  // Handle edit button click
  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  // Handle popup close
  const handleClosePopup = () => {
    setShowEditPopup(false);
  };

  // Handle form submit (add your update logic here)
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes maase');
      return;
    }

    try {
      dispatch(updateStart());
      const userId = currentUser.user?.id || currentUser._id || currentUser.id;

      const res = await fetch(`/api/users/update-user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User Profile Updated");
      }
      setShowEditPopup(false);
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(data.message);
    }

  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
            <div
              className='absolute cursor-pointer right-[17px] -bottom-[50px] md:right-[35px] md:-bottom-[50px] hover:bg-gray-300 rounded-full p-2 transition-colors border border-gray-200'
              title='Edit Button'
              onClick={handleEditClick}
            >
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
        {/* ...blog posts code... */}
      </div>

      {
        updateUserError &&
        <div
          id="toast-bottom-left"
          className={`fixed flex items-center w-full max-w-xs md:max-w-md p-4 space-x-5 text-red-800 border border-red-700 bg-red-200 divide-x rtl:divide-x-reverse divide-gray-200 rounded-md shadow-sm bottom-5 right-5 transition-all duration-500 transform ${showToast ? 'animate-toast-in' : 'animate-toast-out'}`}
          role="alert"
        >
          <div className="text-sm md:text-base font-normal">{updateUserError}</div>
        </div>
      }

      {
        updateUserSuccess && (
          <div
            id="toast-bottom-left"
            className={`fixed flex items-center w-full max-w-xs p-4 space-x-4 text-white border border-green-700 bg-green-200 rounded-md shadow-sm bottom-5 right-5 transition-all duration-500 transform ${showToast ? 'animate-toast-in' : 'animate-toast-out'}`}
            role="alert"
          >
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9" />
            </svg>
            <div className="text-sm md:text-base font-normal">{updateUserSuccess}</div>
          </div>
        )
      }

      {showEditPopup && (
        <div className="fixed inset-0 z-50 p-2 md:p-0 flex items-center justify-center bg-black/40">
          <div className="bg-gray-800 text-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-700 text-2xl"
              onClick={handleClosePopup}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Username</label>
                <input
                  id='username'
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div>
              <label className="block text-gray-700 mb-1" htmlFor="editEmail">Email</label>
              <input
                id="editEmail"
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                required
              />
                </div> */}
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save and update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashProfile;