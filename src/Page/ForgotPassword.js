// ForgotPassword.js
import React, { useState } from 'react';
import Carouselwrapper from './components/Carouselwrapper';
import ContinueWithGoogle from './components/continuewithGoodbutton';
import Logo from '../components/logo';
import API from '../API';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading
  const [messageType, setMessageType] = useState(''); // State to track message type
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setMessage('Sending email...'); // Display loading message
    setMessageType(''); // Reset message type

    try {
      await API.post('/auth/request-password-reset', { email });
      setStep(2); // Move to OTP and new password step
      setMessage("Verification code sent to your email."); // Success message
      setMessageType('success'); // Set message type to success
    } catch (error) {
      setMessage("Error sending verification code. Please try again."); // Error message
      setMessageType('error'); // Set message type to error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleVerificationAndPasswordResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setMessage('Verifying code and resetting password...'); // Display loading message
    setMessageType(''); // Reset message type

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      setMessageType('error'); // Set message type to error
      setLoading(false); // Reset loading state
      return;
    }

    try {
      const response = await API.post('/auth/reset-password', {
        email,
        otp: verificationCode,
        newPassword,
      });

      if (response.data.status === 1) { // Assuming status 1 means success
        setMessage('Password reset successfully! Redirecting to dashboard...');
        setMessageType('success'); // Set message type to success

        // Store user information in local storage
        localStorage.setItem('user', JSON.stringify({ email }));

        // Redirect to dashboard after a successful reset
        setTimeout(() => {
          window.location.href = '/'; // Redirect to dashboard after 2 seconds
        }, 2000);
      } else {
        setMessage('Invalid verification code. Please try again.');
        setMessageType('error'); // Set message type to error
      }
    } catch (error) {
      setMessage('Error resetting password. Please try again.'); // Error message
      setMessageType('error'); // Set message type to error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to determine the password strength
  const passwordStrength = () => {
    if (newPassword.length < 6) return { strength: "Weak", color: "red" };
    if (newPassword.length < 10) return { strength: "Medium", color: "orange" };
    if (/[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) && newPassword.length >= 10) return { strength: "Strong", color: "green" };
    return { strength: "Super Strong", color: "darkgreen" };
  };

  // Determine the icon color based on the theme stored in localStorage
  const getIconColor = () => {
    const theme = localStorage.getItem('theme'); // Assuming you have a theme key in localStorage
    return theme === 'dark' ? 'white' : 'black'; // Change colors based on the theme
  };

  return (
    <main className='flex justify-between'>
      {/* Left Section: Form Area */}
      <section className='sm:w-[860px] flex justify-center dark:bg-[#101828]'>
        <div className='sm:w-[526px]'>
          <div className='mt-[80px]'>
            <Logo width='126.95' height='24.5' />
          </div>
          <div className='space-y-[32px]'>
            <div className='space-y-[12px] sm:mt-[80px]'>
              <h1 className='text-[24px] font-bold dark:text-[#D0D5DD]'>Forgot Password</h1>
              <h3 className='text-[16px] text-[#475467]'>Please enter your details to reset your password.</h3>
            </div>

            {step === 1 && (
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="form_input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading} // Disable input while loading
                  />
                </div>
                <button type="submit" className="btn_primary bg-purple-600" disabled={loading}>
                  {loading ? "Sending email..." : "Send Verification Code"}
                </button>
                {message && (
                  <p className={messageType === 'error' ? "text-red-500 font-bold mt-2" : "text-green-500 mt-2"}>
                    {message}
                  </p>
                )}
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerificationAndPasswordResetSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="verificationCode">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="verificationCode"
                    placeholder="Enter verification code"
                    className="form_input"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="newPassword">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      placeholder="Enter new password"
                      className="form_input"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute top-[12px] right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash color={getIconColor()} /> : <FaEye color={getIconColor()} />} {/* Toggle icon based on state */}
                    </button>
                    {newPassword.length > 0 && ( // Show strength only if password length > 0
                      <p className={`text-sm mt-1 ${passwordStrength().color}`}>
                        {passwordStrength().strength}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-[16px] font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      className="form_input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute top-[12px] right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash color={getIconColor()} /> : <FaEye color={getIconColor()} />} {/* Toggle icon based on state */}
                    </button>
                  </div>
                </div>
                <button type="submit" className="bg-[#6941C6] text-white py-2 rounded w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Reset Password"}
                </button>
                {message && (
                  <p className={messageType === 'error' ? "text-red-500 font-bold mt-2" : "text-green-500 mt-2"}>
                    {message}
                  </p>
                )}
              </form>
            )}

            <p className="mt-4 text-gray-600 text-sm w-full text-center">
              Remembered your password?
              <a href="/login" className="text-[#6941C6] font-bold"> Log in</a>
            </p>
          </div>
        </div>
      </section>

      {/* Right Section: Carousel Area */}
      <Carouselwrapper />
    </main>
  );
}

export default ForgotPassword;
