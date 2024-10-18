import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchUserProfile, updateProfileAvatar, updateUserProfile, removeProfileAvatar, removeUserAccount } from '../../features/slices/profileSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../common/Modal';
import { useNavigate } from 'react-router-dom';
import Input from '../lib/Input';
import Button from '../lib/Button';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { t } = useTranslation();  // Specify the namespace 'profile'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('avatar', e.target.files[0]);
      const resultAction = await dispatch(updateProfileAvatar(formData));
      if (updateProfileAvatar.fulfilled.match(resultAction)) {
        toast.success(t('avatar_updated'));
        dispatch(fetchUserProfile());
      } else {
        toast.error(t('avatar_update_failed'));
      }
    }
  };

  const handleRemoveAvatar = async () => {
    const resultAction = await dispatch(removeProfileAvatar());
    if (removeProfileAvatar.fulfilled.match(resultAction)) {
      toast.success(t('avatar_removed'));
      dispatch(fetchUserProfile());
    } else {
      toast.error(t('avatar_remove_failed'));
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      setIsSaving(true);
      const resultAction = await dispatch(updateUserProfile({ ...profile, ...formData }));
      setIsSaving(false);
      if (updateUserProfile.fulfilled.match(resultAction)) {
        toast.success(t('profile_updated'));
        dispatch(fetchUserProfile());
      } else {
        toast.error(t('profile_update_failed'));
      }
    }
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const confirmDeleteAccount = async () => {
    setIsModalOpen(false);
    const resultAction = await dispatch(removeUserAccount());
    if (removeUserAccount.fulfilled.match(resultAction)) {
      localStorage.clear();
      toast.success(t('account_removed'));
      window.location.href = '/login';
    } else {
      toast.error(t('account_remove_failed'));
    }
  };

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
              alt={t('avatar_alt')}
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
        <h2 className="mb-4 font-semibold text-lg">{t('personal_information')}</h2>
        <form onSubmit={handleSaveProfile}>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-4">
            <Input
              label={t('username')}
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className="dark:bg-gray-700"
            />
            <Input
              label={t('email')}
              name="email"
              type="email"
              value={profile?.email || ''}
              disabled
              className="bg-gray-200 dark:bg-gray-700"
            />
          </div>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-4">
            <Input
              label={t('first_name')}
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              className="dark:bg-gray-700"
            />
            <Input
              label={t('last_name')}
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              className="dark:bg-gray-700"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full md:w-auto"
          >
            {isSaving ? t('saving') : t('save')}
          </Button>
        </form>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 mb-6 p-6 rounded-lg">
        <h2 className="mb-4 font-semibold text-lg">{t('password')}</h2>
        <Button
          variant="primary"
          onClick={() => navigate('/update-password')}
          className="w-full md:w-auto"
        >
          {t('update_password')}
        </Button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <Button
          variant="error"
          onClick={handleDeleteAccount}
          className="w-full"
        >
          {t('delete_account')}
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={cancelDeleteAccount} className="bg-white dark:bg-gray-800 shadow-lg mx-auto mt-20 p-6 rounded-lg max-w-md">
        <h2 className="mb-4 font-semibold text-lg">{t('confirm_delete_account')}</h2>
        <div className="flex justify-end gap-4">
          <Button
            variant="error"
            onClick={confirmDeleteAccount}
          >
            {t('yes_delete_account')}
          </Button>
          <Button
            variant="primary"
            onClick={cancelDeleteAccount}
          >
            {t('no_keep_account')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
