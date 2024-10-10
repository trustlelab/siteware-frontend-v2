import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { fetchAgentData, updateAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 *
 */
const TranscriberConfig = () => {
  const dispatch = useDispatch<AppDispatch>();
  const agentId = useSelector((state: RootState) => state.agent.id);
  const agentData = useSelector((state: RootState) => state.agent.agentData);

  const [transcriber, setTranscriber] = useState('Deepgram');
  const [version, setVersion] = useState('nova-2');
  const [language, setLanguage] = useState('English');
  const [keywords, setKeywords] = useState('Bruce:100');
  const [interruptWords, setInterruptWords] = useState(0.7);
  const [backchanneling, setBackchanneling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (agentId) {
      dispatch(fetchAgentData(agentId));
    }
  }, [agentId, dispatch]);

  useEffect(() => {
    if (agentData) {
      setTranscriber(agentData.transcriptionEngine || 'Deepgram');
      setVersion(agentData.transcriptionVersion || 'nova-2');
      setLanguage(agentData.languageSupport || 'English');
      setKeywords(agentData.keywords || 'Bruce:100');
      setInterruptWords(agentData.endpointing ? agentData.endpointing / 100 : 0.7);
      setBackchanneling(agentData.taskSummarization || false);
    }
  }, [agentData]);

  /**
   *
   */
  const handleSave = async () => {
    if (!agentId) return;

    setIsSaving(true);
    const updatedData = {
      id: agentId,
      data: {
        transcriptionEngine: transcriber,
        transcriptionVersion: version,
        languageSupport: language,
        keywords,
        endpointing: interruptWords * 100,
        taskSummarization: backchanneling,
      },
    };
    try {
      await dispatch(updateAgentData(updatedData));
      toast.success('Agent configuration saved successfully');
    } catch (error) {
      console.error('Error updating agent data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-md w-[900px]">
      <ToastContainer />
      {/* Responsive Two-column grid layout */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {/* Transcriber Dropdown */}
        <div>
          <label className="config_label">Choose Transcriber</label>
          <select className="border border-teal-500 rounded-md config_input" value={transcriber} onChange={(e) => setTranscriber(e.target.value)}>
            <option value="Deepgram">Deepgram</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Version Dropdown */}
        <div>
          <label className="config_label">Version</label>
          <select className="border border-teal-500 rounded-md config_input" value={version} onChange={(e) => setVersion(e.target.value)}>
            <option value="nova-2">nova-2</option>
            <option value="version-1">version-1</option>
          </select>
        </div>

        {/* Language Dropdown */}
        <div>
          <label className="config_label">Choose language</label>
          <select className="border border-teal-500 rounded-md config_input" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        {/* Keywords Input */}
        <div>
          <label className="config_label">Keywords</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="border border-teal-500 rounded-md config_input"
            placeholder="Enter keywords"
          />
          <p className="config_helper_text">Enter certain keywords/proper nouns you'd want to boost while understanding speech</p>
        </div>
      </div>

      {/* Interruptions and Slider */}
      <div className="mt-4">
        <label className="config_label">Number of words to wait for before interrupting (in words)</label>
        <input
          type="range"
          className="bg-teal-500 mt-1 rounded-md w-full h-2 appearance-none range-slider"
          min={0}
          max={1}
          step={0.1}
          value={interruptWords}
          onChange={(e) => setInterruptWords(+e.target.value)}
        />
        <p className="font-semibold config_helper_text">{interruptWords}</p>
        <p className="config_helper_text">
          Agent will not consider interruptions until these many words are spoken (If recipient says "Stopwords" such as Stop, Wait, Hold On, agent will pause
          by default)
        </p>
      </div>

      {/* Backchanneling Toggle */}
      <div className="mt-4">
        <label className="config_label">Backchanneling</label>
        <div className="flex items-center mt-1">
          <input
            type="checkbox"
            checked={backchanneling}
            onChange={() => setBackchanneling(!backchanneling)}
            className="form-checkbox rounded-md focus:ring-teal-500 w-5 h-5 text-teal-600"
          />
          <span className="ml-2 text-gray-600 dark:text-gray-300">
            Agent will speak filler words in between sentences to show the recipient that they are listening to them
          </span>
        </div>
      </div>

      <div className="mt-4">
        <button
          className="bg-gradient-to-r from-teal-400 hover:from-teal-500 to-teal-600 hover:to-teal-700 px-4 py-2 rounded-full focus:ring-2 focus:ring-teal-500 w-full md:w-auto text-white transform transition-transform hover:scale-105 focus:outline-none"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default TranscriberConfig;
