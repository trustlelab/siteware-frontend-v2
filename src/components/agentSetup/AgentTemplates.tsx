import React, { useState } from 'react';
import FeaturesCarousel from './features.carosul';
import Modal from '../global/Modal';
import { useNavigate } from 'react-router-dom';
import API from '../../API'; // Import the API instance for making requests

interface AgentCardProps {
    type: 'voice' | 'text';
}

interface CreateAgentResponse {
    status: number;
    message: string;
    agent: {
        uniqueId: string;
    };
}

const AgentCard: React.FC<AgentCardProps> = ({ type }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agentName, setAgentName] = useState('');
    const [error, setError] = useState('');
    const [isCreating, setIsCreating] = useState(false); // New state for handling "Creating..." button
    const navigate = useNavigate(); // Replacing useHistory with useNavigate

    const handleCreateClick = () => {
        setIsModalOpen(true); // Open the modal when the "Create" button is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
        setError(''); // Clear any errors when closing the modal
    };

    const handleAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgentName(e.target.value);
    };

    const handleNextClick = async () => {
        // Check if the agent name has at least 4 characters
        if (agentName.length < 4) {
            setError('Agent name must be at least 4 characters long.');
            return;
        }

        setIsCreating(true); // Show "Creating..." on the button

        try {
            // POST request to create the agent
            const response = await API.post<CreateAgentResponse>('/agent/create', { name: agentName });

            // Check if response is valid and contains the agent's uniqueId
            if (response?.data?.agent?.uniqueId) {
                // Redirect to the configure-agent page using the uniqueId
                navigate(`/configure-agent?id=${response.data.agent.uniqueId}`);
            } else {
                setError('Failed to create agent. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while creating the agent.');
            console.error(error);
        } finally {
            setIsCreating(false); // Reset the "Creating..." button
        }
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-3 p-6 rounded-[30px] dark:text-white">
            {/* Modal for creating the agent */}
            <Modal className="border-gray-700 dark:bg-black border !rounded-[20px]" isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="mt-5 px-[12px] w-[480px]">
                    <h2 className="mb-6 font-semibold text-2xl">Create your agent</h2>

                    {/* Agent Name */}
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-400 text-sm">Agent Name</label>
                        <input
                            type="text"
                            value={agentName}
                            onChange={handleAgentNameChange}
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg w-full dark:text-white"
                            placeholder="Ted Lasso"
                        />
                        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white"
                            onClick={handleNextClick}
                            disabled={isCreating} // Disable the button while creating
                        >
                            {isCreating ? 'Creating...' : 'Next →'}
                        </button>
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
