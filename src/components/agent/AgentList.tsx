import { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom'; 
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
import Button from '../lib/Button';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

interface Agent {
  id: number;
  name: string;
  model: string;
  uniqueId: string; 
  createdAt: string;
  deployed: boolean;
}

interface AgentsResponse {
  status: number;
  message: string;
  agents: Agent[];
}

const ConfirmDeleteModal: React.FC<{ isOpen: boolean; onConfirm: () => void; onCancel: () => void }> = ({ isOpen, onConfirm, onCancel }) => {
  const { t } = useTranslation('agents'); // Use the agents namespace for translations
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      className="bg-white dark:bg-gray-800 mx-auto mt-20 p-6 rounded-lg max-w-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="mb-4 font-semibold text-lg">{t('confirm_remove_agent')}</h2>
      <div className="flex justify-end gap-4">
        <Button variant='error' onClick={onConfirm}>
          {t('confirm')}
        </Button>
        <Button variant='success' onClick={onCancel}>
          {t('cancel')}
        </Button>
      </div>
    </Modal>
  );
};

const AgentCard: React.FC<{ agent: Agent; onDeleteClick: (agent: Agent) => void }> = ({ agent, onDeleteClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('agents'); // Use the agents namespace for translations

  const handleCardClick = () => {
    dispatch(setId(agent.id));
    navigate('/configure-agent');
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick(agent);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg transition duration-300 cursor-pointer assistant-card"
    >
      <h3 className="mb-2 font-bold text-black text-lg dark:text-white assistant-title">{agent.name}</h3>
      <p className="text-gray-500 text-sm assistant-date">Model: {agent.model}</p>
      <p className="text-gray-500 text-sm assistant-date">Created: {new Date(agent.createdAt).toLocaleDateString()}</p>
      <div className="flex justify-between mt-auto">
        <div className="flex justify-between w-full">
          <div className="flex justify-between items-center space-y-2 mt-4 assistant-status">
            <span className="text-gray-400 text-xs">
              {agent.deployed ? t('running') : <div className="bg-green-400 p-2 rounded-full font-bold text-black">{t('not_deployed')}</div>}
            </span>
          </div>
          <button className="flex items-center text-red-500 hover:text-red-700 transition duration-300 assistant-delete-button" onClick={handleDeleteClick}>
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Agents: React.FC = () => {
  const { t } = useTranslation('agents'); // Use the agents namespace for translations
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
    const fetchAgents = async () => {
      try {
        const response = await API.get<AgentsResponse>('/agent/getlist');
        const agentsData = response?.data.agents;
        if (agentsData) {
          setAgents(agentsData);
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleDelete = (id: number) => {
    setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id));
  };

  const handleDeleteClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedAgent) {
      try {
        await API.delete(`/agent/remove/${selectedAgent.id}`);
        toast.success(t('agent_removed_success'));
        handleDelete(selectedAgent.id);
      } catch (error) {
        toast.error(t('agent_remove_error'));
      } finally {
        setIsModalOpen(false);
        setSelectedAgent(null);
      }
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };

  return (
    <div className="p-6 min-h-screen dark:text-white">
      <ToastContainer position="bottom-center" />
      <div>
        <h1 className="font-bold font-manrope text-3xl">{t('welcome', { name: profile?.firstName ?? '' })}</h1>
        <span>{t('explore_agents')}</span>
      </div>

      <div className="flex justify-between my-6">
        <FilterAgentAndSearch />

        <Link to={'/create-agent'}>
          <Button variant='primary' >
            {t('create_agent')}
          </Button>
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onDeleteClick={handleDeleteClick} />
          ))}
        </div>
      )}

      <ConfirmDeleteModal isOpen={isModalOpen} onConfirm={confirmDelete} onCancel={cancelDelete} />
    </div>
  );
};

export default Agents;
