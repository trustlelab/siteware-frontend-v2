import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { customCountryOptions, CountryOption } from '../../data/countryOptions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPhoneNumbers, removePhoneNumber, addPhoneNumber, updatePhoneNumberLabel } from '../../features/slices/phonenumberSlice';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../lib/Button';
import Input from '../lib/Input';
import { useTranslation } from 'react-i18next';
import CountrySelector from '../common/Country_selector';
import { FaPlus } from 'react-icons/fa';
import { CallAddIcon, DeleteIcon, EditIcon, SearchIcon, TrashIcon } from '../../assets/icons/Icons';

const PhoneNumbers: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const phoneNumbersState = useAppSelector((state) => state.phoneNumber);
  const { phoneNumbers, status, error } = phoneNumbersState;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [country, setCountry] = useState<CountryOption | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [accountSid, setAccountSid] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [editLabel, setEditLabel] = useState<string>('');
  const [editPhoneNumber, setEditPhoneNumber] = useState<string>(''); // State for editing phone number
  const [editNumberId, setEditNumberId] = useState<number | null>(null);
  const [deleteNumberId, setDeleteNumberId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchPhoneNumbers());
  }, [dispatch]);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  // Modify to accept both phone number and label for editing
  const openEditModal = (numberId: number, currentLabel: string, currentPhoneNumber: string): void => {
    setEditNumberId(numberId);
    setEditLabel(currentLabel);
    setEditPhoneNumber(currentPhoneNumber); // Set the current phone number for editing
    setIsEditModalOpen(true);
  };
  const closeEditModal = (): void => setIsEditModalOpen(false);

  const openDeleteConfirmModal = (numberId: number): void => {
    setDeleteNumberId(numberId);
    setIsDeleteConfirmOpen(true);
  };
  const closeDeleteConfirmModal = (): void => setIsDeleteConfirmOpen(false);

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

  // Handle editing of both phone number and label
  const handleEditLabel = async (): Promise<void> => {
    if (editNumberId !== null && (editLabel || editPhoneNumber)) {
      try {
        await dispatch(updatePhoneNumberLabel({ id: editNumberId, label: editLabel, phoneNumber: editPhoneNumber })).unwrap();
        toast.success(t('phone_number_label_updated_success'));
        dispatch(fetchPhoneNumbers());
      } catch (error) {
        toast.error(t('phone_number_label_update_failed', { error }));
      } finally {
        closeEditModal();
      }
    }
  };

  const handleDeletePhoneNumber = async (): Promise<void> => {
    if (deleteNumberId !== null) {
      try {
        await dispatch(removePhoneNumber(deleteNumberId)).unwrap();
        toast.success(t('phone_number_deleted_success'));
        dispatch(fetchPhoneNumbers());
      } catch (error) {
        toast.error(t('phone_number_delete_failed', { error }));
      } finally {
        closeDeleteConfirmModal();
      }
    }
  };


  return (
    <div className='px-8'>
      <div >
        <ToastContainer />


        {/* Import Phone Number Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal} className="dark:bg-gray-900">
          <div className="w-12 h-12 p-3 bg-white dark:bg-gray-800 rounded-[10px] shadow border border-[#eaecf0] dark:border-gray-700 justify-center items-center inline-flex">
            <CallAddIcon />
          </div>

          <div className='my-4'>
            <h2 className="mb-4 font-bold text-xl">{t('import_phone_number')}</h2>
            <div className="text-[#475466] text-base font-medium leading-[30px]">To import phone number please add your<br />Twilio credentials below.</div>
          </div>
          <div className="w-[421px] h-[0px] border border-[#eaecf0] dark:border-gray-700 mt-4"></div>


          <form className='mt-6'>

            {t('twilio_phone_number')}
            <div className="mb-4 flex border-2 dark:border-gray-600 rounded-lg ">

              <CountrySelector
                options={customCountryOptions}
                selected={country}
                onSelect={handleCountryChange}
              />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="dark:bg-gray-800 form-input w-full rounded-r-lg px-"
                placeholder="XXXXXXXXXX"
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
              <Input
                label={t('label')}
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="dark:bg-gray-800 form-input"
                placeholder={t('label_for_phone_number')}
              />
            </div>
            <div className="w-[421px] h-[0px] border border-[#eaecf0] dark:border-gray-700 mt-8 mb-6"></div>

            <div className="flex space-x-3">

              <Button onClick={closeModal} variant='light' className="w-full">
                {t('cancel')}
              </Button>


              <Button className='w-full' onClick={handleImport}>
                {t('Import from Twilio')}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Phone Number Modal */}
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal} className="modal w-[400px]">
          <div className="w-12 h-12 p-3 bg-white dark:bg-gray-800 rounded-[10px] shadow border border-[#eaecf0] dark:border-gray-700 justify-center items-center inline-flex">
            <EditIcon />
          </div>
          <h2 className="mb-4 font-bold text-xl mt-6">{t('edit_phone_number_label')}</h2>
          <div className="text-[#475466] dark:text-gray-300 text-base font-medium leading-[30px]">
            {t('select_option')}
          </div>
          <div className="w-full h-[0px] border border-[#eaecf0] dark:border-[#444] mt-4"></div>

          <form className="mt-6">
            {/* Editable Phone Number */}
            {t('twilio_phone_number')}
            <div className="mb-4 flex border dark:border-gray-600 rounded-lg mt-2">
              <CountrySelector
                options={customCountryOptions}
                selected={country}
                onSelect={handleCountryChange}
              />
              <input
                type="text"
                value={editPhoneNumber}
                onChange={(e) => setEditPhoneNumber(e.target.value)}
                className="dark:bg-gray-800 form-input w-full rounded-r-lg px-2"
                placeholder="XXXXXXXXXX"
              />
            </div>

            {/* Editable Label */}
            <div className="mb-4">
              <label className="form-label">{t('label')}</label>
              <Input
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                placeholder={t('new_label_for_phone_number')}
              />
            </div>

            <div className="flex space-x-3">
              <Button onClick={closeEditModal} variant="light" className="w-full">
                {t('cancel')}
              </Button>
              <Button className="w-full" onClick={handleEditLabel}>
                {t('Save')}
              </Button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isDeleteConfirmOpen} onClose={closeDeleteConfirmModal} className="modal w-[400px]">
          <div className="w-12 h-12 bg-[#fee3e1] dark:bg-[#7f1d1d] rounded-[28px] border-8 border-[#fef2f1] dark:border-[#5a1a1a] justify-center items-center inline-flex">
            <DeleteIcon />
          </div>

          <div className='mt-4'>
            <h2 className="font-bold text-xl">{t('confirm_delete')}</h2>

          </div>
          <p className="my-4">{t('Are you sure you want to delete your phone number? This action cannot be undone.')}</p>

          <div className="text-[#344053] text-base font-bold leading-tight dark:text-white">Twilio Phone Number</div>
          <div className="w-[120px] text-[#101828 ] text-base font-semibold leading-normal p-4 dark:text-white">+14589402933</div>
          <div className="flex space-x-3">
            <Button onClick={closeDeleteConfirmModal} variant='light' className="w-full">
              {t('cancel')}
            </Button>
            <Button onClick={handleDeletePhoneNumber} className='w-full'>
              {t('confirm')}
            </Button>
          </div>
        </Modal>
      </div>

      <div className='my-5'>

        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-4 font-bold text-3xl">{t('Phone_numbers')}</h2>
              <p className="mb-6 text-gray-600">{t('Import_your_phone_numbers_or buy one to use with your AI assistants.')}</p>
            </div>

            <Button type="icon-button" onClick={openModal}>
              <FaPlus className="mr-2" />
              {t('Import_Phone Number')}
            </Button>
          </div>
        </div>
        <div className='h-10 px-3.5 py-3 bg-white dark:bg-gray-800 rounded-lg shadow border border-[#cfd4dc] dark:border-gray-700 justify-start items-center gap-2 inline-flex'>
          <SearchIcon />
          <input
            type="text"
            value={""}
            onChange={() => { }}
            placeholder={t('Search')} // Translated placeholder
            className="bg-transparent text-[#344053] dark:text-white outline-none"
          />
        </div>
      </div>

      {status === 'loading' && <p>{t('loading_phone_numbers')}</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}
      {status === 'succeeded' && phoneNumbers.length > 0 && (


        <div className="w-[90%] bg-white dark:bg-gray-900 rounded-xl shadow border border-[#eaecf0] dark:border-[#333] flex-col justify-start items-start inline-flex">
          <div className="self-stretch bg-white dark:bg-gray-900 justify-start items-start inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="self-stretch h-11 px-6 py-3 bg-[#f8f9fb] dark:bg-gray-800 border-b border-[#eaecf0] dark:border-[#444] justify-start items-center gap-6 inline-flex">
                <div className="w-5 h-5 relative bg-white dark:bg-gray-900 rounded border border-[#cfd4dc] dark:border-[#555]" />
                <div className="justify-start items-center gap-1 flex">
                  <div className="text-[#344054] dark:text-[#e2e2e2] text-xs font-bold leading-[18px]">
                    Twilio Phone Number
                  </div>
                  <div className="w-4 h-4 relative" />
                </div>
              </div>

              {phoneNumbers.map((number) => (
                <div key={number.id} className="self-stretch h-[72px] px-6 py-4 border-b border-[#eaecf0] dark:border-[#444] justify-start items-center gap-6 inline-flex">
                  <div className="w-5 h-5 relative bg-white dark:bg-gray-900 rounded border border-[#cfd4dc] dark:border-[#555]" />
                  <div className="pr-[13px] justify-start items-center gap-2 flex">
                    <div className="w-[30px] h-[15.81px] rounded-sm" />
                    <div className="text-[#0f1728] dark:text-[#e2e2e2] text-sm font-medium leading-tight">
                      {number.phoneNumber}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-[559px] flex-col justify-start items-start inline-flex">
              <div className="self-stretch h-11 px-6 py-3 bg-[#f8f9fb] dark:bg-gray-800 border-b border-[#eaecf0] dark:border-[#444] justify-start items-center gap-3 inline-flex">
                <div className="justify-start items-center gap-1 flex">
                  <div className="text-[#344054] dark:text-[#e2e2e2] text-xs font-bold leading-[18px]">
                    Label
                  </div>
                </div>
              </div>
              {phoneNumbers.map((number) => (
                <div key={number.id} className="self-stretch h-[72px] px-6 py-4 border-b border-[#eaecf0] dark:border-[#444] justify-start items-center inline-flex">
                  <div className="px-3 py-1 bg-[#f2f4f7] dark:bg-gray-800 rounded-2xl justify-start items-center gap-1 flex">
                    <div className="text-center text-[#101828] dark:text-[#e2e2e2] text-xs font-medium leading-tight">
                      {number.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-[116px] flex-col justify-start items-start inline-flex">
              <div className="self-stretch h-11 px-6 py-3 bg-[#f8f9fb] dark:bg-gray-800 border-b border-[#eaecf0] dark:border-[#444] justify-start items-center gap-3 inline-flex">
                <div className="text-[#344054] dark:text-[#e2e2e2] text-xs font-bold leading-[18px]">
                  Actions
                </div>
              </div>
              {phoneNumbers.map((number) => (
                <div key={number.id} className="self-stretch h-[72px] space-x-3 p-4 border-b border-[#eaecf0] dark:border-[#444] justify-start items-center gap-1 inline-flex">
                  <button onClick={() => openDeleteConfirmModal(number.id)}>

                    <TrashIcon />
                  </button>
                  <button
               onClick={() => openEditModal(number.id, number.label, number.phoneNumber)}

                    className="text-blue-400 dark:text-blue-500 hover:text-blue-600 dark:hover:text-blue-700"
                  >
                    <EditIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>


      )}
      {status === 'succeeded' && phoneNumbers.length === 0 && <p className="text-center text-gray-500">{t('no_phone_numbers')}</p>}

    </div>


  );
};

export default PhoneNumbers;
