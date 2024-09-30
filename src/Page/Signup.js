import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import Carouselwrapper from './components/Carouselwrapper';
import ContinueWithGoogle from './components/continuewithGoodbutton';
import Logo from '../components/logo';
import Form_divider from './components/form_divider';
import API from '../API';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const passwordStrength = () => {
    if (password.length < 6) return { strength: "Weak", color: "red" };
    if (password.length < 10) return { strength: "Medium", color: "orange" };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 10) return { strength: "Strong", color: "green" };
    return { strength: "Super Strong", color: "darkgreen" };
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setLoading(true); // Set loading to true when the request starts
    setError(null); // Clear previous error messages

    try {
      const response = await API.post('/auth/signup', {
        email,
        password,
      });

      // Store user data in localStorage upon successful signup
      localStorage.setItem('user', JSON.stringify(response.data)); // Save user data
      setSuccess("User created successfully!");
      setError(null);

      // Redirect to the root route ("/") after successful signup
      window.location.href = '/'; // Redirect to root
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
      setSuccess(null);
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  // Check if fields are filled and terms accepted
  const isFormValid = () => {
    return email && password && confirmPassword && termsAccepted && password === confirmPassword;
  };

  // Determine the icon color based on the theme stored in localStorage
  const getIconColor = () => {
    const theme = localStorage.getItem('theme'); // Assuming you have a theme key in localStorage
    return theme === 'dark' ? 'white' : 'black'; // Change colors based on the theme
  };

  return (
    <main className='flex justify-between dark:bg-[#101828]'>
      <section className='sm:w-[860px] flex justify-center dark:bg-[#101828]'>
        <div className='sm:w-[526px]'>
          <div className='mt-[80px]'>
            <Logo width="126.95" height="24.5"/>
          </div>
          <div className='space-y-[32px]'>
            <div className='space-y-[12px sm:mt-[80px]'>
              <h1 className='text-[24px] font-bold dark:text-[#D0D5DD]'>Create your account</h1>
              <h3 className='text-[16px] text-[#475467] dark:text-[#D0D5DD]'>Welcome back! Please enter your details.</h3>
            </div>

            <ContinueWithGoogle/>
            <Form_divider/>

            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="FormInput_label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form_input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4 relative"> {/* Add relative positioning */}
                <label className="FormInput_label" htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="form_input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-12 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash color={getIconColor()} /> : <FaEye color={getIconColor()} />} {/* Toggle icon based on state */}
                </button>
                {password.length > 0 && ( // Show strength only if password length > 0
                  <p className={`text-sm mt-1 ${passwordStrength().color}`}>
                    {passwordStrength().strength}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="FormInput_label" htmlFor="confirm-password">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm password"
                  className="form_input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-500 font-bold">{error}</p>} {/* Display error message */}
              {success && <p className="text-green-500">{success}</p>} {/* Display success message */}

              <div className="flex items-center mt-4">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="terms-checkbox" 
                  checked={termsAccepted} 
                  onChange={() => setTermsAccepted(!termsAccepted)} 
                />
                <label htmlFor="terms" className="ml-2 cursor-pointer dark:text-white">
                  <span className="checkmark"></span>
                  I accept the Siteware
                  <a href="/terms" className="font-bold"> Terms of Service</a>
                  <span> and</span>
                  <a href="/privacy" className='font-bold'> Privacy Policy</a>.
                </label>
              </div>

              <div className="flex flex-col items-center mt-8">
                <button 
                  type="submit" 
                  className="btn_primary" 
                  disabled={loading || !termsAccepted} 
                  style={{ opacity: loading || !termsAccepted ? 0.8 : 1 }} // Change opacity based on state
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </div>
            </form>

            <p className="mt-4 text-gray-600 text-[16px] w-full text-center dark:text-[#D0D5DD] space-x-1">
              <span>Already have a Siteware account?</span>
              <a href="/login" className="font-bold">Login</a>
            </p>
          </div>
        </div>
      </section>
      <Carouselwrapper />
    </main>
  );
}

export default Signup;
