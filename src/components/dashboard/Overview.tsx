import { FiTrendingUp } from 'react-icons/fi';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Overview: React.FC = () => {
  const { t } = useTranslation(); // Specify the 'overview' namespace

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
    labels: [t('completed'), t('dropped')],
    datasets: [
      {
        data: callData.reasonCallEnded,
        backgroundColor: ['#7C3AED', '#22C55E'],
        borderWidth: 0,
      },
    ],
  };

  const averageCallDurationData = {
    labels: [t('average_call_duration_by_assistant')],
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
      <h2 className="mb-5 font-bold text-2xl">{t('overview')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <span className="text-xl">{t('total_call_minutes')}</span>
          <span className="font-bold text-4xl">{callData.totalMinutes}</span>
          <span className="flex items-center text-green-400">
            {t('increase')} <FiTrendingUp className="ml-2" />
          </span>
        </div>
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <span className="text-xl">{t('number_of_calls')}</span>
          <span className="font-bold text-4xl">{callData.numberOfCalls}</span>
          <span className="flex items-center text-green-400">
            {t('increase')} <FiTrendingUp className="ml-2" />
          </span>
        </div>
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <span className="text-xl">{t('total_spent')}</span>
          <span className="font-bold text-4xl">${callData.totalSpent.toFixed(2)}</span>
          <span className="flex items-center text-green-400">
            {t('increase')} <FiTrendingUp className="ml-2" />
          </span>
        </div>
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <span className="text-xl">{t('average_cost_per_call')}</span>
          <span className="font-bold text-4xl">${callData.averageCostPerCall.toFixed(2)}</span>
          <span className="flex items-center text-green-400">
            {t('increase')} <FiTrendingUp className="ml-2" />
          </span>
        </div>
      </div>
      <h3 className="mb-5 font-bold text-xl">{t('call_analysis')}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <h4 className="mb-4 font-bold text-lg">{t('reason_call_ended')}</h4>
          <div className="w-full max-w-[300px] mx-auto">
            <Doughnut data={reasonCallEndedData} />
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
          <h4 className="mb-4 font-bold text-lg">{t('average_call_duration_by_assistant')}</h4>
          <div className="w-full max-w-[300px] mx-auto">
            <Doughnut data={averageCallDurationData} />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <h4 className="mb-4 font-bold text-lg">{t('cost_per_provider')}</h4>
        <div className="font-bold text-4xl">${callData.costPerProvider.toFixed(2)}</div>
        <span className="flex items-center text-green-400">
          {t('increase')} <FiTrendingUp className="ml-2" />
        </span>
      </div>
    </div>
  );
};

export default Overview;
