import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';
import { updateAgentData, fetchAgentData } from '../../../../features/slices/agentSlice';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../lib/Button'; // Reusable Button component
import Dropdown from '../../../lib/DropDown'; // Reusable Dropdown component
import { useTranslation } from 'react-i18next'; // Import the translation hook

/**
 * Function component for configuring agent functions.
 */
const FunctionsConfig: FC = () => {
  const { t } = useTranslation(); // Use the namespace for FunctionsConfig translations
  const dispatch = useDispatch<AppDispatch>();
  const agentId = useSelector((state: RootState) => state.agent.id);
  const agentData = useSelector((state: RootState) => state.agent.agentData);
  const [selectedFunction, setSelectedFunction] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (agentId) {
      dispatch(fetchAgentData(agentId));
    }
  }, [agentId, dispatch]);

  useEffect(() => {
    if (agentData && agentData.functionName) {
      setSelectedFunction(agentData.functionName);
    }
  }, [agentData]);

  /**
   * Handle saving the selected function.
   */
  const handleSave = async () => {
    if (!agentId) return;

    setIsSaving(true);
    const updatedData = {
      id: agentId,
      data: {
        functionName: selectedFunction,
      },
    };
    try {
      await dispatch(updateAgentData(updatedData));
      toast.success(t('function_saved')); // Translated toast message
    } catch (error) {
      console.error('Error updating agent data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md p-6 rounded-lg w-full max-w-full mx-auto">
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Dropdown for selecting function */}
        <div className="w-full md:w-3/4">
          <Dropdown
            label={t('choose_function')} // Translated label
            options={[
              t('check_slot_availability'), // Translated dropdown options
              t('another_function'),
              t('yet_another_function'),
            ]}
            selected={selectedFunction}
            onChange={(value) => setSelectedFunction(value)}
          />
        </div>

        {/* Save Button */}
        <div className="w-full md:w-1/4 flex justify-end">
          <Button
            variant="primary"
            size="normal"
            radius="lg"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full md:w-auto"
          >
            {isSaving ? t('saving') : t('save_function')} {/* Translated button label */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FunctionsConfig;
