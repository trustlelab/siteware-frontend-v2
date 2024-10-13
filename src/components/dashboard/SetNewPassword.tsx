import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { updatePassword } from '../../features/slices/profileSlice';
import { Link } from 'react-router-dom';

const SetNewPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    setIsUpdating(true);
    try {
      await dispatch(updatePassword({ oldPassword, newPassword, confirmPassword })).unwrap();
      toast.success('Password updated successfully!');
    } catch (error) {
      toast.error('Failed to update password. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md mx-auto p-6 rounded-lg max-w-2xl">
      <div className="mb-10">
        <Link to="/profile"> Back to profile</Link>
      </div>
      <ToastContainer position="bottom-center" />
      <h1 className="mb-4 font-bold text-2xl text-gray-800 dark:text-white">Update Your Password</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">Please enter your old password, and set a new password below.</p>
      <form onSubmit={handleUpdatePassword}>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300" htmlFor="old-password">
            Old Password
          </label>
          <input
            type="password"
            id="old-password"
            className="border-gray-300 dark:bg-gray-700 p-2 border rounded-md w-full dark:text-white"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300" htmlFor="new-password">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            className="border-gray-300 dark:bg-gray-700 p-2 border rounded-md w-full dark:text-white"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300" htmlFor="confirm-password">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="border-gray-300 dark:bg-gray-700 p-2 border rounded-md w-full dark:text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full md:w-auto font-semibold text-white" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default SetNewPassword;
