import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchUserProfile, updateProfileAvatar, updateUserProfile, removeProfileAvatar, removeUserAccount } from '../../features/slices/profileSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../common/Modal';
import { useNavigate } from 'react-router-dom';

/**
 *
 */
const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { profile } = useSelector((state: RootState) => state.userProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile());
    } else {
      setFormData({
        username: profile.username || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
      });
    }
  }, [profile, dispatch]);

  /**
   *
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   *
   */
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('avatar', e.target.files[0]);
      const resultAction = await dispatch(updateProfileAvatar(formData));
      if (updateProfileAvatar.fulfilled.match(resultAction)) {
        toast.success('Profile avatar updated successfully!');
        dispatch(fetchUserProfile());
      } else {
        toast.error('Failed to update profile avatar.');
      }
    }
  };

  /**
   *
   */
  const handleRemoveAvatar = async () => {
    const resultAction = await dispatch(removeProfileAvatar());
    if (removeProfileAvatar.fulfilled.match(resultAction)) {
      toast.success('Profile avatar removed successfully!');
      dispatch(fetchUserProfile());
    } else {
      toast.error('Failed to remove profile avatar.');
    }
  };

  /**
   *
   */
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      setIsSaving(true);
      const resultAction = await dispatch(updateUserProfile({ ...profile, ...formData }));
      setIsSaving(false);
      if (updateUserProfile.fulfilled.match(resultAction)) {
        toast.success('Profile updated successfully!');
        dispatch(fetchUserProfile());
      } else {
        toast.error('Failed to update profile.');
      }
    }
  };

  /**
   *
   */
  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  /**
   *
   */
  const confirmDeleteAccount = async () => {
    setIsModalOpen(false);
    const resultAction = await dispatch(removeUserAccount());
    if (removeUserAccount.fulfilled.match(resultAction)) {
      localStorage.clear();
      toast.success('Your account has been successfully removed.');
      window.location.href = '/login';
    } else {
      toast.error('Failed to remove account.');
    }
  };

  /**
   *
   */
  const cancelDeleteAccount = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md mx-auto p-6 rounded-lg max-w-4xl">
      <ToastContainer position="bottom-center" />
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-32">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <img
              src={profile?.avatarUrl ? `${import.meta.env.VITE_API_BASE_URL}${profile.avatarUrl}` : 'https://ln.run/Cffck'}
              alt="Profile Avatar"
              className="mb-4 rounded-full w-32 h-32"
            />
          </label>
          <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          <button
            className="top-0 right-0 absolute flex justify-center items-center bg-gray-700 dark:hover:bg-black rounded-full w-[30px] h-[30px] text-white hover:text-white"
            onClick={handleRemoveAvatar}
          >
            <IoMdClose size={20} />
          </button>
        </div>

        <h1 className="text-2xl">
          {formData.firstName} {formData.lastName}
        </h1>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 mb-6 p-6 rounded-lg">
        <h2 className="mb-4 font-semibold text-lg">Personal Information</h2>
        <form onSubmit={handleSaveProfile}>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-4">
            <div>
              <label className="block mb-1 font-medium text-sm">Username</label>
              <input
                type="text"
                name="username"
                className="border-gray-300 dark:bg-gray-700 p-2 border rounded-md w-full dark:text-white"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">Email</label>
              <input
                type="email"
                name="email"
                className="border-gray-300 bg-gray-200 dark:bg-gray-700 p-2 border rounded-md w-full dark:text-white"
                value={profile?.email || ''}
                disabled
              />
            </div>
          </div>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-4">
            <div>
              <label className="block mb-1 font-medium text-sm">First Name</label>
              <input
                type="text"
                name="firstName"
                className="border-gray-300 dark:bg-gray-700 p-2 border rounded-md w-full dark:text-white"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="border-gray-300 dark:bg-gray-700 p-2 border rounded-md w-full dark:text-white"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full md:w-auto font-semibold text-white">
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 mb-6 p-6 rounded-lg">
        <h2 className="mb-4 font-semibold text-lg">Password</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full md:w-auto font-semibold text-white"
          onClick={() => navigate('/update-password')}
        >
          Update Password
        </button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 mb-6 p-6 rounded-lg">
        <h2 className="mb-4 font-semibold text-lg">API</h2>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full md:w-auto font-semibold text-white">Generate API Key</button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md w-full font-semibold text-white" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={cancelDeleteAccount} className="bg-white dark:bg-gray-800 shadow-lg mx-auto mt-20 p-6 rounded-lg max-w-md">
        <h2 className="mb-4 font-semibold text-lg">Are you sure you want to remove your account?</h2>
        <div className="flex justify-end gap-4">
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold text-white" onClick={confirmDeleteAccount}>
            Yes, Delete My Account
          </button>
          <button className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md font-semibold text-white" onClick={cancelDeleteAccount}>
            No, Keep My Account
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
