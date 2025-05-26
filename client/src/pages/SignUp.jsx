import { useState } from 'react';
import bloggerAB from '../assets/blogger.png'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
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

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill in all fields');
    };

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);

      if (res.ok) {
        navigate('/sign-in');
      };

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

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
            <h1 className='sm:text-3xl text-xl font-bold mb-2'>Sign Up</h1>
            <input type='text' id='username' value={formData.username} className='mt-1 block w-full border-b border-blue-700 shadow-sm p-2 outline-none' placeholder='Username' onChange={handleChange} />
          </div>

          <div className='mb-4'>
            <input type='email' id='email' value={formData.email} className='mt-1 block w-full border-b border-blue-700 shadow-sm p-2 outline-none' placeholder='your@gmail.com' onChange={handleChange} />
          </div>

          <div className='mb-4'>
            <input type='password' id='password' value={formData.password} className='mt-1 block w-full border-b border-blue-700 shadow-sm p-2 outline-none' placeholder='Password' onChange={handleChange} />
          </div>

          {
            errorMessage &&
            <div className='bg-red-100 border border-red-400 text-red-500 px-4 py-2.5 rounded relative mb-4'>
              <p className='text-sm font-medium'>{errorMessage}</p>
            </div>
          }

          <button type='submit' className='w-full font-semibold bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-1 cursor-pointer' disabled={loading}>
            {loading ? (
              <div className='flex items-center justify-center'>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span className='text-white'>Signing Up...</span>
              </div>
            ) : 'Sign Up'}
          </button>

          <p className="mt-4 text-center text-gray-600 sm:text-sm text-xs">
            Don't have an account? <Link to="/sign-in" className="text-blue-600 hover:text-blue-700 font-bold">Sign In</Link>
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

export default SignUp;