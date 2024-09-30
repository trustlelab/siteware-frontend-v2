// Login.js
import React, { useState } from 'react';
import Carouselwrapper from './components/Carouselwrapper';
import ContinueWithGoogle from './components/continuewithGoodbutton';
import Logo from '../components/logo';
import Form_divider from './components/form_divider';
import API from '../API';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [rememberMe, setRememberMe] = useState(false); // State for the checkbox

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await API.post('/auth/login', {
        email,
        password,
      });

      // Store user data in localStorage upon successful login
      localStorage.setItem('user', JSON.stringify(response.data)); // Adjust based on your response structure
      setSuccess("Login successful!");
      setError(null);
      
      // Redirect to the root route ("/") after successful login
      window.location.href = '/'; // Change the route to the root

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
      setSuccess(null);
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <main className='flex justify-between'>
      <section className='sm:w-[860px] flex justify-center dark:bg-[#101828]'>
        <div className='sm:w-[526px]'>
          <div className='mt-[80px]'>
            <Logo width='126.95' height='24.5' />
          </div>
          <div className='space-y-[32px]'>
            <div className='space-y-[12px] sm:mt-[80px]'>
              <h1 className='text-[24px] font-bold text-[#475467] dark:text-[#D0D5DD]'>Welcome Back</h1>
              <h3 className='text-[16px] text-[#475467] dark:text-[#D0D5DD]'>
                Please enter your credentials to continue.
              </h3>
            </div>

            <ContinueWithGoogle />
            <Form_divider />

            <form onSubmit={handleLogin}>
              <div className='mb-4'>
                <label className='FormInput_label' htmlFor='email'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder='Enter your email'
                  className='form_input'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className='mb-4'>
                <label className='FormInput_label' htmlFor='password'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder='Enter your password'
                  className='form_input'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}

              <div className='flex items-center mt-4'>
                <input 
                  type='checkbox' 
                  id='remember' 
                  className='terms-checkbox' 
                  checked={rememberMe} 
                  onChange={() => setRememberMe(!rememberMe)} 
                />
                <label htmlFor='remember' className='ml-2 cursor-pointer dark:text-white'>
                  <span className="checkmark"></span>
                  Remember Me
                </label>
              </div>

              <div className='flex flex-col items-center mt-8'>
                <button type="submit" className='btn_primary' disabled={loading}> {/* Disable the button if loading */}
                  {loading ? "Signing in..." : "Login"} {/* Change button text based on loading state */}
                </button>
              </div>
            </form>

            <p className='mt-4 text-gray-600 dark:text-white text-[16px] w-full text-center'>
              Don't have an account?
              <a href='/signup' className='font-bold'>
                {' '}Sign up
              </a>
            </p>

            <p className='mt-2 text-gray-600 text-sm w-full text-center'>
              <a href='/forgot-password' className='text-[16px] font-bold'>
                Forgot Password?
              </a>
            </p>
          </div>
        </div>
      </section>
      <Carouselwrapper />
    </main>
  );
}

export default Login;
