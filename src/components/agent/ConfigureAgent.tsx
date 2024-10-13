import React, { useState, useEffect } from 'react';
import Tab from './voice/config/Tab';
import { FaPhone, FaComments } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setId, fetchAgentData } from '../../features/slices/agentSlice';
import { RootState, AppDispatch } from '../../app/store';
import API from '../../utils/API';
import AgentConfig from './voice/config/AgentConfig';
import LLMConfig from './voice/config/LLMconfig';
import TranscriberConfig from './voice/config/TranscriberConfig';
import VoiceConfig from './voice/config/VoiceConfig';
import CallConfig from './voice/config/CallConfig';
import FunctionsConfig from './voice/config/FunctionsConfig';
import TasksConfig from './voice/config/TaskConfiguration';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

interface Agent {
  id: number;
  name: string;
  model: string;
}

interface AgentsResponse {
  status: number;
  message: string;
  agents: Agent[];
}

const ConfigureAgent: React.FC = () => {
  const { t } = useTranslation('configureAgent'); // Use the 'configureAgent' namespace
  const [activeTab, setActiveTab] = useState<string>('Model');
  const [agents, setAgents] = useState<Agent[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const currentId = useSelector((state: RootState) => state.agent.id);
  const currentAgentName = useSelector((state: RootState) => state.agent.agentData?.name);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await API.get<AgentsResponse>('/agent/getlist');
        setAgents(response.data.agents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    if (currentId) {
      dispatch(fetchAgentData(currentId));
      localStorage.setItem('selectedAgentId', currentId.toString());
    } else {
      const savedAgentId = localStorage.getItem('selectedAgentId');
      if (savedAgentId) {
        const id = parseInt(savedAgentId, 10);
        dispatch(setId(id));
        dispatch(fetchAgentData(id));
      }
    }
  }, [dispatch, currentId]);

  const handleAgentClick = (id: number) => {
    if (currentId !== id) {
      dispatch(setId(id));
      dispatch(fetchAgentData(id));
      localStorage.setItem('selectedAgentId', id.toString());
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Agent':
        return <AgentConfig />;
      case 'LLM':
        return <LLMConfig />;
      case 'Transcriber':
        return <TranscriberConfig />;
      case 'Voice':
        return <VoiceConfig />;
      case 'Call':
        return <CallConfig />;
      case 'Functions':
        return <FunctionsConfig />;
      case 'Tasks':
        return <TasksConfig />;
      default:
        return <AgentConfig />;
    }
  };

  return (
    <main className="flex space-y-4 m-10 w-full">
      <div className="flex space-y-4">
        <div className="space-y-3 dark:bg-gray-900 shadow-light dark:shadow-none mr-[12px] px-4 py-2 rounded-lg w-[290px] h-screen">
          <h1 className="text-xl">{t('agents')}</h1>
          {agents.map((agent) => {
            const isActive = currentId === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => handleAgentClick(agent.id)}
                className={`p-2 rounded hover:text-white dark:text-white ${
                  isActive ? 'bg-primary-light text-white' : 'bg-blue-50 hover:bg-primary-light hover:dark:!bg-primary-light/50 dark:bg-gray-800'
                }`}
              >
                {agent.name}
              </div>
            );
          })}
        </div>
        <div className="space-y-4 w-full">
          <div className="flex justify-between w-[900px]">
            <div className="rounded-full text-xl sapce-y-5">
              <p>{currentAgentName || t('select_agent')}</p>
              <div className="border-green-600 dark:bg-gray-900 px-2 border rounded-lg text-green-500 dark:text-gray-300">
                <div className="font-semibold text-sm">{t('call_rate')}</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center hover:dark:bg-gray-700 dark:bg-gray-800 shadow-md px-[12px] p-2 rounded-lg h-[40px] dark:text-gray-300 transition duration-200">
                <FaPhone className="mr-2" />
                {t('incoming_calls')}
              </button>

              <button className="flex items-center bg-primary-light hover:bg-purple-800 shadow-md px-[12px] p-2 rounded-lg h-[40px] text-white transition duration-200">
                <FaComments className="mr-2" />
                {t('speak_to_agent')}
              </button>
            </div>
          </div>
          <Tab onSelect={setActiveTab} />
          <div className="mt-4">{renderContent()}</div>
        </div>
      </div>
    </main>
  );
};

export default ConfigureAgent;
