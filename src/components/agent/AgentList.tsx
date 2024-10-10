import { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import API from '../../utils/API';
import { useDispatch, useSelector } from 'react-redux';
import { setId } from '../../features/slices/agentSlice';
import LoadingSkeleton from '../common/LoadingSkeleton';
import FilterAgentAndSearch from './FilterAgentAndSearch';
import { fetchUserProfile } from '../../features/slices/profileSlice';
import { RootState, AppDispatch } from '../../app/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../common/Modal';

// Define the Agent type based on the JSON structure you provided
interface Agent {
  id: number;
  name: string;
  model: string;
  uniqueId: string; // Add uniqueId to the agent interface
  createdAt: string;
  deployed: boolean;
}

// API response structure
interface AgentsResponse {
  status: number;
  message: string;
  agents: Agent[];
}

// Modal component for confirming deletion
const ConfirmDeleteModal: React.FC<{ isOpen: boolean; onConfirm: () => void; onCancel: () => void }> = ({ isOpen, onConfirm, onCancel }) => (
  <Modal
    isOpen={isOpen}
    onClose={onCancel}
    className="bg-white dark:bg-gray-800 mx-auto mt-20 p-6 rounded-lg max-w-md"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <h2 className="mb-4 font-semibold text-lg">Are you sure you want to remove this agent?</h2>
    <div className="flex justify-end gap-4">
      <button className="bg-red-600 px-4 py-2 rounded-md text-white" onClick={onConfirm}>
        Confirm
      </button>
      <button className="bg-gray-300 px-4 py-2 rounded-md text-black" onClick={onCancel}>
        Cancel
      </button>
    </div>
  </Modal>
);

/**
 *
 */
const AgentCard: React.FC<{ agent: Agent; onDeleteClick: (agent: Agent) => void }> = ({ agent, onDeleteClick }) => {
  const navigate = useNavigate(); // For navigation
  const dispatch = useDispatch<AppDispatch>();

  /**
   *
   */
  const handleCardClick = () => {
    dispatch(setId(agent.id)); // Set the agent id using redux
    navigate('/configure-agent'); // Navigate to the configure agent page
  };

  /**
   * Handle delete button click
   */
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when delete button is clicked
    onDeleteClick(agent);
  };

  return (
    <div
      onClick={handleCardClick} // Navigate when the card is clicked
      className="bg-white dark:bg-gray-800 p-4 rounded-lg transition duration-300 cursor-pointer assistant-card"
    >
      {/* Agent name, model and created date */}
      <h3 className="mb-2 font-bold text-black text-lg dark:text-white assistant-title">{agent.name}</h3>
      <p className="text-gray-500 text-sm assistant-date">Model: {agent.model}</p>
      <p className="text-gray-500 text-sm assistant-date">Created: {new Date(agent.createdAt).toLocaleDateString()}</p>

      {/* Action buttons */}
      <div className="flex justify-between mt-auto">
        <div className="flex justify-between w-full">
          <div className="flex justify-between items-center space-y-2 mt-4 assistant-status">
            <span className="text-gray-400 text-xs">
              {agent.deployed ? 'Running' : <div className="bg-green-400 p-2 rounded-full font-bold text-black">NOT DEPLOYED</div>}
            </span>
          </div>
          <button
            className="flex items-center text-red-500 hover:text-red-700 transition duration-300 assistant-delete-button"
            onClick={handleDeleteClick}
          >
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 *
 */
const Agents: React.FC = () => {
  // State for managing agents
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.userProfile.profile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    /**
     *
     */
    const fetchAgents = async () => {
      try {
        const response = await API.get<AgentsResponse>('/agent/getlist');
        const agentsData = response?.data.agents;
        if (agentsData) {
          setAgents(agentsData); // Set agents into state
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // Function to remove an agent
  /**
   *
   */
  const handleDelete = (id: number) => {
    setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id));
  };

  /**
   * Handle delete click from AgentCard
   */
  const handleDeleteClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  /**
   * Confirm agent deletion
   */
  const confirmDelete = async () => {
    if (selectedAgent) {
      try {
        await API.delete(`/agent/remove/${selectedAgent.id}`);
        toast.success('Agent removed successfully');
        handleDelete(selectedAgent.id);
      } catch (error) {
        toast.error('Error removing agent');
      } finally {
        setIsModalOpen(false);
        setSelectedAgent(null);
      }
    }
  };

  /**
   * Cancel agent deletion
   */
  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };

  return (
    <div className="p-6 min-h-screen dark:text-white">
      <ToastContainer position="bottom-center" />
      <div>
        <h1 className="font-bold font-manrope text-3xl">Welcome, {profile?.firstName ?? ''}</h1>
        <span>Explore your created agents</span>
      </div>

      <div className="flex justify-between my-6">
        <FilterAgentAndSearch />

        <Link to={'/create-agent'}>
          <button className="assistant-button">+ Create Agent</button>
        </Link>
      </div>

      <div className="my-4"></div>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onDeleteClick={handleDeleteClick} />
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmDeleteModal isOpen={isModalOpen} onConfirm={confirmDelete} onCancel={cancelDelete} />
    </div>
  );
};

export default Agents;
