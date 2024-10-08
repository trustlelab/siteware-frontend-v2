import { FiTrendingUp } from 'react-icons/fi';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const Overview: React.FC = () => {
  const callData = {
    totalMinutes: 5,
    numberOfCalls: 15,
    totalSpent: 0.45,
    averageCostPerCall: 0.09,
    reasonCallEnded: [4, 1],
    averageCallDuration: 1.03,
    costPerProvider: 0.44,
  };

  const reasonCallEndedData = {
    labels: ['Completed', 'Dropped'],
    datasets: [
      {
        data: callData.reasonCallEnded,
        backgroundColor: ['#7C3AED', '#22C55E'],
        borderWidth: 0,
      },
    ],
  };

  const averageCallDurationData = {
    labels: ['Average Call Duration'],
    datasets: [
      {
        data: [callData.averageCallDuration, 5 - callData.averageCallDuration],
        backgroundColor: ['#6366F1', '#A5B4FC'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-dark-800 mx-auto p-5 rounded-lg max-w-7xl text-black dark:text-white">
      <h2 className="mb-5 font-bold text-2xl">Overview</h2>
      <div className="gap-4 grid grid-cols-4 mb-10">
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <span className="text-xl">Total Call Minutes</span>
          <span className="font-bold text-4xl">{callData.totalMinutes}</span>
          <span className="flex items-center text-green-400">
            +0.00% <FiTrendingUp className="ml-2" />
          </span>
        </div>
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <span className="text-xl">Number of Calls</span>
          <span className="font-bold text-4xl">{callData.numberOfCalls}</span>
          <span className="flex items-center text-green-400">
            +0.00% <FiTrendingUp className="ml-2" />
          </span>
        </div>
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <span className="text-xl">Total Spent</span>
          <span className="font-bold text-4xl">${callData.totalSpent.toFixed(2)}</span>
          <span className="flex items-center text-green-400">
            +0.00% <FiTrendingUp className="ml-2" />
          </span>
        </div>
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <span className="text-xl">Average Cost per Call</span>
          <span className="font-bold text-4xl">${callData.averageCostPerCall.toFixed(2)}</span>
          <span className="flex items-center text-green-400">
            +0.00% <FiTrendingUp className="ml-2" />
          </span>
        </div>
      </div>
      <h3 className="mb-5 font-bold text-xl">Call Analysis</h3>
      <div className="gap-4 grid grid-cols-2 mb-10">
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <h4 className="mb-4 font-bold text-lg">Reason Call Ended</h4>
          <div className='w-[300px]'>
          <Doughnut data={reasonCallEndedData} />
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <h4 className="mb-4 font-bold text-lg">Average Call Duration by Assistant</h4>
         
          <div className='w-[300px]'>
          <Doughnut data={averageCallDurationData} />
          </div>
          
          
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <h4 className="mb-4 font-bold text-lg">Cost Per Provider</h4>
        <div className="font-bold text-4xl">${callData.costPerProvider.toFixed(2)}</div>
        <span className="flex items-center text-green-400">
          +0.00% <FiTrendingUp className="ml-2" />
        </span>
      </div>
    </div>
  );
};

export default Overview;