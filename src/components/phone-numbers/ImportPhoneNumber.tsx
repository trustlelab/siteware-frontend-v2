import React, { useState, useEffect } from 'react';
import { FiPhone, FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import Modal from '../common/Modal';
import { customCountryOptions, CountryOption } from '../../data/countryOptions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPhoneNumbers, removePhoneNumber, addPhoneNumber, updatePhoneNumberLabel } from '../../features/slices/phonenumberSlice';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../lib/Button';
import Input from '../lib/Input';
import { useTranslation } from 'react-i18next';
import CountrySelector from '../common/Country_selector';

const PhoneNumbers: React.FC = () => {
  const { t } = useTranslation(); // Initialize i18n translation
  const dispatch = useAppDispatch();
  const phoneNumbersState = useAppSelector((state) => state.phoneNumber);
  const { phoneNumbers, status, error } = phoneNumbersState;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [country, setCountry] = useState<CountryOption | null>(null); // Store selected country
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [accountSid, setAccountSid] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [editLabel, setEditLabel] = useState<string>('');
  const [editNumberId, setEditNumberId] = useState<number | null>(null);

  // Fetch phone numbers on component mount
  useEffect(() => {
    dispatch(fetchPhoneNumbers());
  }, [dispatch]);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  const openEditModal = (numberId: number, currentLabel: string): void => {
    setEditNumberId(numberId);
    setEditLabel(currentLabel);
    setIsEditModalOpen(true);
  };
  const closeEditModal = (): void => setIsEditModalOpen(false);

  const handleCountryChange = (selectedCountry: CountryOption | null): void => setCountry(selectedCountry);

  const handleImport = async (): Promise<void> => {
    if (country && phoneNumber && accountSid && authToken && label) {
      const combinedPhoneNumber = `${country.value}${phoneNumber}`;
      try {
        await dispatch(
          addPhoneNumber({
            phoneNumber: combinedPhoneNumber,
            label,
            accountSid,
            authToken,
          })
        ).unwrap();
        toast.success(t('phone_number_imported_success'));
        dispatch(fetchPhoneNumbers());
      } catch (error) {
        toast.error(t('phone_number_import_failed', { error }));
      }
      closeModal();
    }
  };

  const handleEditLabel = async (): Promise<void> => {
    if (editNumberId !== null && editLabel) {
      try {
        await dispatch(updatePhoneNumberLabel({ id: editNumberId, label: editLabel })).unwrap();
        toast.success(t('phone_number_label_updated_success'));
        dispatch(fetchPhoneNumbers());
      } catch (error) {
        toast.error(t('phone_number_label_update_failed', { error }));
      } finally {
        closeEditModal();
      }
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 mx-auto p-12 rounded-lg max-w-6xl text-black dark:text-white">
      <ToastContainer />
      <div className="gap-12 grid lg:grid-cols-2">
        {/* Left section: Import Phone Numbers */}
        <div className="space-y-8">
          <div className="flex justify-center text-5xl text-blue-400">
            <FiPhone className="w-20 h-20" />
          </div>
          <h3 className="font-semibold text-3xl text-center">{t('manage_phone_numbers')}</h3>
          <p className="text-center text-gray-500">{t('import_description')}</p>
          <div className="flex flex-col items-center space-y-4">
            <Button type='icon-button' onClick={openModal}>
              <FiPlus className="mr-2" /> {t('import_number')}
            </Button>
          </div>
        </div>

        {/* Right section: List of Phone Numbers */}
        <div className="dark:bg-gray-900 p-8 rounded-lg">
          <h4 className="mb-6 font-semibold text-2xl text-white">{t('your_phone_numbers')}</h4>
          {status === 'loading' && <p>{t('loading_phone_numbers')}</p>}
          {status === 'failed' && <p className="text-red-500">{error}</p>}
          {status === 'succeeded' && phoneNumbers.length > 0 && (
            <ul className="space-y-4">
              {phoneNumbers.map((number) => (
                <li key={number.id} className="flex justify-between items-center bg-gray-800 shadow hover:shadow-lg p-5 rounded-lg transition">
                  <div>
                    <span className="block font-semibold text-lg">{number.label}</span>
                    <span className="text-gray-400">{number.phoneNumber}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => openEditModal(number.id, number.label)} className="text-blue-400 hover:text-blue-600">
                      <FiEdit />
                    </button>
                    <button onClick={() => dispatch(removePhoneNumber(number.id))} className="text-red-400 hover:text-red-600">
                      <FiTrash2 />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {status === 'succeeded' && phoneNumbers.length === 0 && <p className="text-center text-gray-500">{t('no_phone_numbers')}</p>}
        </div>
      </div>

      {/* Import Phone Number Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} className="modal">
        <h2 className="mb-4 font-bold text-xl">{t('import_phone_number')}</h2>
        <form>
          <div className="mb-4 ">
            <CountrySelector
              options={customCountryOptions}
              selected={country}
              onSelect={handleCountryChange}
            />

       
          </div>
          <div className="mb-4 flex space-x-4">
          <Input
              label={t('twilio_phone_number')}
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="dark:bg-gray-800 form-input"
              placeholder="XXXXXXXXXX"
            />
             <Input
              label={t('label')}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="dark:bg-gray-800 form-input"
              placeholder={t('label_for_phone_number')}
            />
          
          </div>
          <div className="mb-4">
          <Input
              label={t('twilio_account_sid')}
              type="text"
              value={accountSid}
              onChange={(e) => setAccountSid(e.target.value)}
              className="dark:bg-gray-800 form-input"
              placeholder={t('twilio_account_sid')}
            />
            <Input
              label={t('twilio_auth_token')}
              type="text"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
              className="dark:bg-gray-800 form-input"
              placeholder={t('twilio_auth_token')}
            />
          </div>
          <div className="mb-4">
           
          </div>
          <div className="flex justify-end">
            <Button variant='error' type="button" onClick={closeModal} className="px-4 py-2">
              {t('cancel')}
            </Button>
            <Button variant='primary' onClick={handleImport} className="ml-3 px-4 py-2 btn-primary">
              {t('import')}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Phone Number Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} className="modal w-[400px]">
        <h2 className="mb-4 font-bold text-xl mt-6">{t('edit_phone_number_label')}</h2>
        <form >
          <div className="mb-4">
            <label className="form-label">{t('label')}</label>
            <Input
              type="text"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              placeholder={t('new_label_for_phone_number')}
            />
          </div>
          <div className="flex justify-end">
            <Button variant='error' onClick={closeEditModal} className="px-4 py-2">
              {t('cancel')}
            </Button>
            <Button variant='primary' onClick={handleEditLabel} className="ml-3 px-4 py-2">
              {t('update_label')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PhoneNumbers;
