import React, { useState, useEffect } from 'react';
import Tab from '../config/Tab';
import { FaPhone, FaComments } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../API'; // Assuming API instance exists to fetch agents
import AgentConfig from '../config/AgentConfig';
import LLMConfig from '../config/LLMconfig';
import TranscriberConfig from '../config/TranscriberConfig';
import VoiceConfig from '../config/VoiceConfig';
import CallConfig from '../config/CallConfig';
import FunctionsConfig from '../config/FunctionsConfig';
import TasksConfig from '../config/TaskConfiguration';

// Define the Agent type based on the JSON structure
interface Agent {
  id: number;
  name: string;
  uniqueId: string; // Assuming uniqueId is part of the agent
  model: string;
}

// Define the response structure for the agents list API
interface AgentsResponse {
  status: number;
  message: string;
  agents: Agent[];
}

// Custom hook to extract query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ConfigureAgent: React.FC = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<string>('Model');
  const [agents, setAgents] = useState<Agent[]>([]); // State for managing the agent list
  const query = useQuery();
  const agentId = query.get('id'); // Get agent id from the URL

  const handleTabSelect = (tabName: string) => {
    console.log('Selected Tab:', tabName);
    setActiveTab(tabName); // Update the active tab
  };

  // Fetch agents when the component mounts
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Use the correct response type with Axios
        const response = await API.get<AgentsResponse>('/agent/getlist');
        setAgents(response.data.agents); // Set agents into state
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  // Debugging: Log agentId and agent.id to ensure they match
  useEffect(() => {
    console.log('Selected agentId:', agentId);
  }, [agentId]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Agent':
        return <AgentConfig />; // Pass agentId if needed
      case 'LLM':
        return <LLMConfig/>;
      case 'Transcriber':
        return <TranscriberConfig/>;
    
      case 'Voice':
        return <VoiceConfig/>;
      case 'Call':
        return <CallConfig/>;

      case 'Functions':
        return <FunctionsConfig/>;

      case 'Tasks':
        return <TasksConfig/>;
      default:
        return <AgentConfig />;
    }
  };

  const navigate = useNavigate(); // Initialize navigate for programmatic URL updates

  const handleAgentClick = (uniqueId: string) => {
    // Update the URL with the selected agent's uniqueId
    navigate(`?id=${uniqueId}`);
  };


  return (
    <main className='flex space-y-4 m-10 w-full'>
      <div className='flex space-y-4'>
        <div className='space-y-3 shadow-light dark:shadow-none mr-[12px] p-2 rounded-lg w-[250px] h-screen'>
          <h1>Agents List </h1>
          {/* Display dynamic agent list */}
          {agents.map((agent, index) => {
            // Debugging: Log agent.id to check comparison
            console.log(`agent.id: ${agent.id}, agentId: ${agentId}`);

            // Apply active background if agentId matches agent.id
            const isActive = agentId === agent.uniqueId.toString();

            return (
              <div
                key={index}
                onClick={() => handleAgentClick(agent.uniqueId)} // On click, set uniqueId in the URL
                className={`p-2 rounded hover:text-white dark:text-white ${isActive
                  ? 'bg-primary-light text-white'
                  : 'bg-blue-50 hover:bg-primary-light hover:dark:!bg-primary-light/50 dark:bg-gray-800'
                  }`}
              >
                {agent.name}
              </div>
            );
          })}
        </div>
        <div className='space-y-4 w-full'>
          <div className='flex justify-between'>
            <button className='dark:bg-black px-6 p-2 rounded-full'>
              My assistant
            </button>

            <div className="flex space-x-4">
              <div className="border-green-600 dark:bg-gray-900 px-5 p-1 border rounded-lg text-green-500 dark:text-gray-300">
                <div className="font-semibold text-xl">$0.05/min</div>
              </div>

              {/* Button to receive incoming calls */}
              <button className="flex items-center hover:dark:bg-gray-700 dark:bg-gray-800 shadow-md p-2 rounded-lg dark:text-gray-300 transition duration-200">
                <FaPhone className="mr-2" /> {/* Phone icon */}
                Receive Incoming Calls
              </button>

              {/* Button to speak to your agent */}
              <button className="flex items-center bg-primary-light hover:bg-purple-800 shadow-md p-2 rounded-lg text-white transition duration-200">
                <FaComments className="mr-2" /> {/* Comments icon */}
                Speak to Your Agent
              </button>
            </div>
          </div>
          <Tab onSelect={handleTabSelect} />
          <div className="mt-4">{renderContent()}</div>
        </div>
      </div>
    </main>
  );
};

export default ConfigureAgent;
