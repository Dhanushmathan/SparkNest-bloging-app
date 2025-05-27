import { useState } from 'react';
import bloggerAB from '../assets/blogger.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value.trim()
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill in all fields'));
    };

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='flex flex-col items-center md:flex-row lg:flex-row lg:space-x-20 p-3 h-screen'>
      {/* Left Side with Abstract Background Image */}
      <div className='hidden sm:flex flex-col items-center lg:w-1/2 w-full'>
        <img
          src={bloggerAB}
          alt='Abstract'
          className='w-[85%] lg:w-[90%] h-auto object-cover mt-5 lg:mt-0 lg:mb-0 mb-5 max-w-md mx-auto'
        />
      </div>

      {/* Right Side with Sign Up Form */}
      <div className='flex flex-col items-center w-full lg:w-1/2 max-w-md mr-0 md:mr-10 lg:mr-16 mt-5
        md:justify-center md:h-screen md:mt-0'>
        <form className='w-full' onSubmit={handleSubmit}>

          <div className='mb-2 text-center'>
            <h1 className='sm:text-3xl text-xl font-bold mb-2'>Sign In</h1>
          </div>

          <div className='mb-4'>
            <input type='email' id='email' value={formData.email} className='mt-1 block w-full border-b border-blue-700 shadow-sm p-2 outline-none' placeholder='your@gmail.com' onChange={handleChange} />
          </div>

          <div className='mb-4'>
            <input type='password' id='password' value={formData.password} className='mt-1 block w-full border-b border-blue-700 shadow-sm p-2 outline-none' placeholder='**********' onChange={handleChange} />
          </div>

          {
            errorMessage &&
            <div className='bg-red-100 border border-red-400 text-red-500 px-4 py-2.5 rounded relative mb-4'>
              <p className='text-sm font-medium'>{errorMessage}</p>
            </div>
          }

          <button type='submit' className='w-full font-semibold bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-1 cursor-pointer' disabled={loading}>
            {loading ? (
              <div className='flex items-center justify-center space-x-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"></path><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform></path></svg>
                <span className='text-white'>Signing In...</span>
              </div>
            ) : 'Sign In'}
          </button>

          <p className="mt-4 text-center text-gray-600 sm:text-sm text-xs">
            Don't have an account? <Link to="/sign-up" className="text-blue-600 hover:text-blue-700 font-bold">Sign Up</Link>
          </p>

        </form>
      </div>

      <div className='block xs:hidden mt-5 lg:w-1/2 w-full'>
        <img
          src={bloggerAB}
          alt='Abstract'
          className='w-[85%]'
        />
      </div>
    </div>
  )
}

export default SignIn;