import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import API from '../../utils/API';
import { useDispatch, useSelector } from 'react-redux';
import { setId } from '../../redux/slices/agent-slice';
import LoadingSkeleton from '../common/LoadingSkeleton';
import FilterAgentAndSearch from './FilterAgentAndSearch';
import { fetchUserProfile } from '../../redux/slices/profile-slice';
import { RootState, AppDispatch } from '../../redux/store';

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

// Card component for each agent, showing the name, model, status, created date, and action buttons
const AgentCard: React.FC<{ agent: Agent; onDelete: (id: number) => void }> = ({ agent, onDelete }) => {
  const navigate = useNavigate(); // For navigation
  const dispatch = useDispatch<AppDispatch>();

  // Handle card click to navigate to the configure page
  const handleCardClick = () => {
    dispatch(setId(agent.id)); // Set the agent id using redux
    navigate('/configure-agent'); // Navigate to the configure agent page
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
            onClick={async (e) => {
              e.stopPropagation(); // Prevent card click when delete button is clicked
              try {
                await API.delete(`/agent/remove/${agent.id}`);
                alert('Agent removed successfully');
                onDelete(agent.id);
              } catch (error) {
                alert('Error removing agent');
              }
            }}
          >
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Agents: React.FC = () => {
  // State for managing agents
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
  const handleDelete = (id: number) => {
    setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id));
  };

  return (
    <div className="p-6 min-h-screen dark:text-white">

      <div>
        <h1 className='font-bold font-manrope text-3xl'>
          Welcome {profile?.firstName ?? ''}
        </h1>
        <span>
          Explore your created agents
        </span>
      </div>
      
      <div className="flex justify-between my-6">
      <FilterAgentAndSearch/>

        <Link to={'/create-agent'}>
          <button className="assistant-button">+ Create Agent</button>
        </Link>

      </div>
      
     <div className='my-4'>
     </div>
      {loading ? (
      <LoadingSkeleton/>
      ) : (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Agents;