import { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/API';
import { useDispatch } from 'react-redux';
import { setId } from '../../features/slices/agentSlice';
import LoadingSkeleton from '../common/LoadingSkeleton';
import FilterAgentAndSearch from './FilterAgentAndSearch';
import { fetchUserProfile } from '../../features/slices/profileSlice';
import { AppDispatch } from '../../app/store';
import { toast, ToastContainer } from 'react-toastify';
import Modal from '../common/Modal';
import Button from '../lib/Button';
import { useTranslation } from 'react-i18next';
import CreateAgent from './Create';
import ExploreAgents from './Explore';
import { DeleteIcon } from '../../assets/icons/Icons';

interface Agent {
  agentType: string;
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
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      className="bg-white dark:bg-gray-800 mx-auto p-6 rounded-lg max-w-md sm:w-[400px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="w-12 h-12 bg-[#fee3e1] dark:bg-[#7f1d1d] rounded-[28px] border-8 border-[#fef2f1] dark:border-[#5a1a1a] justify-center items-center inline-flex">
        <DeleteIcon />
      </div>

      <div className='mt-4'>
        <div className="text-[#101828] dark:text-white text-xl font-bold leading-9">{t('modal_delete_title')}</div>
        <div className="text-[#475466] dark:text-gray-300 text-base font-medium leading-[30px]">{t('modal_delete_confirmation')}</div>
      </div>
      <div className="w-[352px] h-[0px] border border-[#eaecf0] dark:border-gray-700 mt-6"></div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="light" onClick={onCancel} className='w-full'>
          {t('button_cancel')}
        </Button>
        <Button variant="error" onClick={onConfirm} className='w-full'>
          {t('button_confirm')}
        </Button>
      </div>
    </Modal>
  );
};

const AgentCard: React.FC<{ agent: Agent; onDeleteClick: (agent: Agent) => void }> = ({ agent, onDeleteClick }) => {
  const { t } = useTranslation('agents_module');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
      className="w-[349px] pb-6 p-6 bg-white dark:bg-[#1D2939] rounded-xl shadow border border-[#eaecf0] dark:border-gray-700 flex-col justify-start items-start gap-6 inline-flex"
    >
      <div className='flex items-center justify-between w-full'>
        <div className="w-10 h-10 bg-[#f0ebff] dark:bg-[#4c1d95] rounded-full"></div>
        <div>
          {agent.deployed ? (
            <div className='bg-[#027A48] py-1 px-3 rounded-full bg-opacity-10 text-[##027A48] font-bold '>{t('status_deployed')}</div>
          ) : (
            <div className='bg-[#EF4444] py-1 px-3 rounded-full bg-opacity-10 text-[#EF4444] font-bold '>{t('status_not_deployed')}</div>
          )}
        </div>
      </div>
      <div className='flex gap-y-2 flex-col'>
        <div className="w-[301.33px] text-[#344053] dark:text-white text-base font-bold leading-tight">{agent.name}</div>
        <div className="text-[#667085] dark:text-gray-400 text-sm font-semibold leading-tight">{agent.agentType==="TEXT"?t('agentTypeText'):t('agentTypeVoice')}</div>
      </div>
      <div className="w-[301px] h-[0px] border border-[#eaecf0] dark:border-gray-700"></div>
      <div className="text-[#667085] dark:text-gray-400 text-sm font-semibold leading-[25px]">{t('summary_agent_purpose')}</div>

      <div className='flex justify-between w-full space-x-3'>
        <Button className='w-full' onClick={handleCardClick}>
          {t('action_open')}
        </Button>
        <div className="w-10 h-10 flex-col justify-start items-start gap-4 inline-flex" onClick={handleDeleteClick}>
          <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg shadow border border-[#d0d5dd] dark:border-gray-600 justify-center items-center gap-2 inline-flex">
            <RiDeleteBin6Line size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Agents: React.FC = () => {
  const { t } = useTranslation('agents_module');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const dispatch = useDispatch<AppDispatch>();

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
        toast.success(t('toast_success_agent_removed'));
        handleDelete(selectedAgent.id);
      } catch (error) {
        toast.error(t('toast_error_agent_removal'));
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
      <div className='flex justify-between'>
        <div>
          <h2 className="text-[#101828] dark:text-white text-2xl font-bold leading-9">{t('title_agent_management')}</h2>
          <div className="text-[#475466] dark:text-gray-300 text-base font-medium leading-[30px]">{t('description_manage_agents')}</div>
        </div>
        <div className='flex gap-x-6'>
          <ExploreAgents />
          <CreateAgent />
        </div>
      </div>

      <ToastContainer position="bottom-center" />

      <div className="flex justify-between flex-wrap my-6 gap-4">
        <FilterAgentAndSearch />
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="flex gap-6 flex-wrap">
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
