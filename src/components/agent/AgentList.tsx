import { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../utils/API';
import { useDispatch } from 'react-redux';
import { setId } from '../../features/slices/agentSlice';
import LoadingSkeleton from '../common/LoadingSkeleton';
import FilterAgentAndSearch from './FilterAgentAndSearch';
import { fetchUserProfile } from '../../features/slices/profileSlice';
import {  AppDispatch } from '../../app/store';
import { toast, ToastContainer } from 'react-toastify';
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
  const { t } = useTranslation(); // Use the agents namespace for translations
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      className="bg-white dark:bg-gray-800 mx-auto p-6 rounded-lg max-w-md w-full md:w-2/3"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="mb-4 font-semibold text-lg w-[90%]">{t('confirm_remove_agent')}</h2>
      <div className="flex justify-end gap-4">
        <Button variant="error" onClick={onConfirm}>
          {t('confirm')}
        </Button>
        <Button variant="success" onClick={onCancel}>
          {t('cancel')}
        </Button>
      </div>
    </Modal>
  );
};

const AgentCard: React.FC<{ agent: Agent; onDeleteClick: (agent: Agent) => void }> = ({ agent, onDeleteClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation(); // Use the agents namespace for translations

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
      className="w-[349px] pb-0 p-6 bg-white rounded-xl shadow border border-[#eaecf0] flex-col justify-start items-start gap-6 inline-flex"
    >
      <div className='flex items-center  justify-between w-full'>

        <div className="w-10 h-10 bg-[#f0ebff] rounded-full">

        </div>



        <div>
          {agent.deployed ? (
            t('running')
          ) : (
            <div className="h-7 px-3 py-1 mix-blend-multiply bg-[#027a48]/10 rounded-2xl justify-start items-center gap-1 inline-flex">
              <div className="w-2 h-2 relative">
                <div className="w-1.5 h-1.5 left-[1px] top-[1px] absolute bg-[#027947] rounded-full" />
              </div>
              <div className="text-center text-[#027947] text-xs font-semibold  leading-tight">{t('not_deployed')}</div>
            </div>

          )}
        </div>


      </div>
      <div className='flex gap-y-2 flex-col'>
        <div className="w-[301.33px] text-[#344053] text-base font-bold  leading-tight">{agent.name}</div>
        <div className="text-[#667085] text-sm font-semibold  leading-tight">Voice Agent</div>
      </div>
      <div className="w-[301px] h-[0px] border border-[#eaecf0]"></div>
      <div className="text-[#667085] text-sm font-semibold  leading-[25px]">Helps resolve common customer inquiries with quick, automated responses. Optimized for e-commerce and service industries.</div>



      <div className='flex justify-between w-full space-x-3'>

        <Button className='w-full' onClick={handleCardClick}>
          Open
        </Button>

        <div className="w-10 h-10 flex-col justify-start items-start gap-4 inline-flex">
          <div className="w-10 h-10  bg-white rounded-lg shadow border border-[#d0d5dd] justify-center items-center gap-2 inline-flex">
            <RiDeleteBin6Line size={20} />
          </div>
        </div>

      </div>



      <div className="flex justify-between mt-auto">

        <button
          className="flex items-center text-red-500 hover:text-red-700 transition duration-300"
          onClick={handleDeleteClick}
        >

        </button>
      </div>
    </div >
  );
};

const Agents: React.FC = () => {
  const { t } = useTranslation(); // Use the agents namespace for translations
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

      <div className='flex justify-between'>
        <div>
          <h2 className="text-[#101828] text-2xl font-bold  leading-9">Agents</h2>
          <div className="text-[#475466] text-base font-medium leading-[30px]">Description</div>
        </div>

        <div className='flex gap-x-6'>
          <div className="h-10 px-[18px] py-2.5 bg-white rounded-lg shadow border border-[#d0d5dd] justify-center items-center gap-2 inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"> <path d="M7.00008 1.1665V12.8332M1.16675 6.99984H12.8334" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" /> </svg>
            <div className="text-[#101828] text-sm font-bold  leading-normal">Explore templates</div>
          </div>

          <div className="w-auto h-10 flex-col justify-start items-start gap-4 inline-flex">
            <div className="self-stretch h-10 px-[18px] py-2.5 bg-[#7e56d8] rounded-lg shadow border border-[#7e56d8] justify-center items-center gap-2 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <path d="M10.0001 4.1665V15.8332M4.16675 9.99984H15.8334" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" /> </svg>
              <Link to={'/create-agent'}><div className="text-white text-sm font-bold  leading-normal">{t('create_agent')}</div></Link>
            </div>
          </div>
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
