import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

interface Assistant {
  id: number;
  name: string;
  type: string;
  trigger: string;
  createdDate: string;
  deployed: boolean;
}

const assistantsData: Assistant[] = [
  { id: 1, name: "Alex Johnson (Support)", type: "Inbound", trigger: "Welcome", createdDate: "08/15/2023", deployed: true },
  { id: 2, name: "Emily Davis (Sales)", type: "Outbound", trigger: "Follow Up", createdDate: "09/10/2023", deployed: false },
  { id: 3, name: "Michael Smith (Billing)", type: "Inbound", trigger: "Payment Reminder", createdDate: "07/01/2023", deployed: true },
  { id: 4, name: "Sophia Lee (Technical Support)", type: "Outbound", trigger: "Product Inquiry", createdDate: "06/25/2023", deployed: true },
  { id: 5, name: "David Brown (Customer Service)", type: "Inbound", trigger: "Feedback Request", createdDate: "10/05/2023", deployed: false },
  { id: 6, name: "Olivia Wilson (Marketing)", type: "Outbound", trigger: "Campaign Launch", createdDate: "05/12/2023", deployed: true },
  { id: 7, name: "Daniel Garcia (HR)", type: "Inbound", trigger: "Interview Schedule", createdDate: "08/30/2023", deployed: false },
];

const AssistantCard: React.FC<{ assistant: Assistant }> = ({ assistant }) => {
  return (
    <div className="assistant-card">
      <div className="assistant-status">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${assistant.deployed ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
          <span className="font-medium text-black text-lg dark:text-white">Voice Assistant</span>
        </div>
        <span className="text-gray-400 text-xs">DEPLOYED</span>
      </div>
      <h3 className="assistant-title">{assistant.name}</h3>
      <p className="assistant-trigger">{assistant.trigger}</p>
      <p className="assistant-date">Created {assistant.createdDate}</p>
      <div className="flex justify-between mt-auto">
        <button className="assistant-button">
          Open
        </button>
        <button className="assistant-delete-button">
        <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

const Assistants: React.FC = () => {
  return (
    <div className="p-6 min-h-screen dark:text-white">

      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Assistants</h1>
       <Link to={'create-agent'}>
       <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-bold text-white transition duration-300">
          + Create Assistants
        </button>
        </Link>
      </div>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {assistantsData.map((assistant) => (
          <AssistantCard key={assistant.id} assistant={assistant} />
        ))}
      </div>
    </div>
  );
};

export default Assistants;
