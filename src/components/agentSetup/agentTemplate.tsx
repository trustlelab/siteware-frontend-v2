import React, { useState } from 'react';
import FeaturesCarousel from './features.carosul';
import Modal from '../global/Modal';
import { Link } from 'react-router-dom';

interface AgentCardProps {
    type: 'voice' | 'text';
}

const AgentCard: React.FC<AgentCardProps> = ({ type }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateClick = () => {
        setIsModalOpen(true); // Open the modal when the "Create" button is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-3 p-6 rounded-[30px] dark:text-white">

            <Modal className='border-gray-700 dark:bg-black border !rounded-[20px]' isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className='mt-5 px-[12px] w-[780px] max-h-[800px] overflow-y-scroll msb'>
                <h2 className="mb-6 font-semibold text-2xl">Create your  agent
                </h2>

                {/* Agent Name */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-400 text-sm">Agent Name</label>
                    <input
                        type="text"
                        className="bg-gray-800 p-3 rounded-lg w-full text-white"
                        placeholder="Ted Lasso"
                    />
                </div>

                {/* Personality */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-400 text-sm">Personality</label>
                    <div className="relative">
                        <select className="bg-gray-800 p-3 rounded-lg w-full text-white">
                            <option>😀 Friendly</option>
                            {/* Add other personality options here */}
                        </select>
                    </div>
                </div>

                {/* Agent Title */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-400 text-sm">Agent Title</label>
                    <input
                        type="text"
                        className="bg-gray-800 p-3 rounded-lg w-full text-white"
                        placeholder="Business Development Representative"
                    />
                </div>

                {/* Company Name */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-400 text-sm">Company Name</label>
                    <input
                        type="text"
                        className="bg-gray-800 p-3 rounded-lg w-full text-white"
                        placeholder="Sleep Haven"
                    />
                </div>

                {/* Company Business */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-400 text-sm">Company Business</label>
                    <textarea
                        className="bg-gray-800 p-3 rounded-lg w-full text-white"
                        rows={4}
                        placeholder="Our mission at Sleep Haven is to help people achieve a better night's sleep by providing..."
                    />
                </div>

                {/* Brand Voice */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-400 text-sm">Brand Voice</label>
                    <textarea
                        className="bg-gray-800 p-3 rounded-lg w-full text-white"
                        rows={4}
                        placeholder="Our brand voice is informal, empathetic, and passionate about great sleep..."
                    />
                </div>

                {/* Audience */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-400 text-sm">Audience</label>
                    <textarea
                        className="bg-gray-800 p-3 rounded-lg w-full text-white"
                        rows={4}
                        placeholder="Our audience is environmentally conscious consumers aged 25-45..."
                    />
                </div>

                {/* Advanced Options */}
                <div className="mb-4">
                    <button className="text-gray-400 text-sm hover:text-gray-200">
                        ➤ Advanced Options
                    </button>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                   <Link to={'/configure-agent'}>
                   <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white">
                        Next →
                    </button>
                   </Link>


                </div>
                </div>
               

            </Modal>

            {/* Avatar and Title */}

            <div>
                <FeaturesCarousel />
            </div>

            <div className="dark:bg-gray-950 p-3 rounded-2xl w-[50%]">
                <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full w-12 h-12 text-2xl">
                        <span>👤</span>
                    </div>
                    <div className="ml-4">
                        <h3 className="font-semibold text-xl">
                            {type === 'text' ? 'AI Text Assistant' : 'Real-Time Voice Assistant'}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {type === 'text' ? 'An AI Assistant for Text Queries' : 'An Employee Who Works 24 x 7'}
                        </p>
                    </div>
                </div>

                <button
                    className="bg-purple-500 hover:bg-purple-600 mb-4 px-4 py-2 rounded-lg w-full text-white transition duration-200"
                    onClick={handleCreateClick}
                >
                    + Create
                </button>
            </div>



        </div>
    );
};

export default AgentCard;
