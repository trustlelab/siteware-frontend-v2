import React, { useState } from 'react';
import { FiPhone, FiShoppingCart, FiPlus, FiAlertTriangle } from 'react-icons/fi';
import Modal from '../common/Modal';
import Select from 'react-select';
import countryTelData from 'country-telephone-data';

const PhoneNumbers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [country, setCountry] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const options = countryTelData.allCountries.map((country) => ({
    value: country.dialCode,
    label: `${country.name} (+${country.dialCode})`,
    code: country.iso2,
  }));

  const handleCountryChange = (value: any) => {
    setCountry(value);
  };

  return (
    <div className="bg-dark-800 dark:bg-gray-900 mx-auto p-5 rounded-lg max-w-lg text-white">
      <div className="flex justify-center mb-5 text-6xl text-blue-400">
        <FiPhone className="w-16 h-16" />
      </div>
      <h3 className="mb-2 font-bold text-2xl text-white">Phone Numbers</h3>
      <p className="mb-5 text-gray-400 dark:text-gray-500">
        Assistants are able to be connected to phone numbers for calls. You can import from Twilio, Vonage, or buy one directly from Vapi for use with your assistants.
      </p>
      <div className="flex justify-between mt-5">
        <button className="flex items-center bg-blue-500 px-4 py-2 rounded text-white">
          <FiShoppingCart className="mr-2 w-5 h-5" />
          Buy Number
        </button>
        <button onClick={openModal} className="flex items-center bg-gray-500 px-4 py-2 rounded text-white">
          <FiPlus className="mr-2 w-5 h-5" />
          Import
        </button>
      </div>
      <div className="flex items-center bg-yellow-200 dark:bg-yellow-300 mt-5 p-4 rounded text-yellow-800 dark:text-yellow-900">
        <FiAlertTriangle className="mr-2 w-5 h-5" />
        Please add Card Details to Buy a Number
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} className="bg-dark-900 dark:bg-gray-800 mx-auto mt-20 p-5 rounded-lg max-w-md text-white">
        <h2 className="mb-4 font-bold text-xl">Import Phone Number</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Country Code</label>
            <Select
              options={options}
              value={country}
              onChange={handleCountryChange}
              classNamePrefix="react-select"
              className="text-black"
              placeholder="Select Country Code"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Twilio Phone Number</label>
            <input type="text" className="bg-dark-700 dark:bg-gray-600 p-2 rounded w-full text-white" placeholder="+1XXXXXXXXXX" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Twilio Account SID</label>
            <input type="text" className="bg-dark-700 dark:bg-gray-600 p-2 rounded w-full text-white" placeholder="Twilio Account SID" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Twilio Auth Token</label>
            <input type="text" className="bg-dark-700 dark:bg-gray-600 p-2 rounded w-full text-white" placeholder="Twilio Auth Token" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Label</label>
            <input type="text" className="bg-dark-700 dark:bg-gray-600 p-2 rounded w-full text-white" placeholder="Label for Phone Number" />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={closeModal} className="bg-gray-600 dark:bg-gray-700 mr-2 px-4 py-2 rounded text-white">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
              Import from Twilio
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PhoneNumbers;