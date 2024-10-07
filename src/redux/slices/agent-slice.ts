import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/API';

interface Agent {
  id: number;
  name: string;
  model: string;
  welcomeMessage?: string;
  agentPrompt?: string;
  speechRecognition?: boolean;
  languageSupport?: string;
  ttsEngine?: string;
  ttsVoices?: string;
  sttEngine?: string;
  realTimeSTT?: boolean;
  voiceCallSupported?: boolean;
  voiceCallProvider?: string;
  llmModel?: string;
  llmVersion?: string;
  tokenLimit?: number;
  temperature?: number;
  transcriptionEngine?: string;
  transcriptionVersion?: string;
  keywords?: string;
  bufferSize?: number;
  linearDelay?: number;
  endpointing?: number;
  ambientNoise?: string;
  onlineCheckMessage?: string;
  invokeAfterSeconds?: number;
  callProvider?: string;
  callHangupLogic?: string;
  callTerminationTime?: number;
  functionName?: string;
  taskSummarization?: boolean;
  extractionEnabled?: boolean;
  webhookURL?: string;
  knowledgeBase?: string;
}

interface AgentState {
  id: number | null;
  agentData: Agent | null;
}

const initialState: AgentState = {
  id: null,
  agentData: null,
};

// Thunk to fetch agent data
export const fetchAgentData = createAsyncThunk<Agent, number>(
  'agent/fetchAgentData',
  async (id, { getState }) => {
    const state = getState() as { agent: AgentState };
    if (state.agent.agentData?.id === id) {
      console.log('Data already fetched for id:', id);
      return state.agent.agentData;
    }
    console.log('Fetching agent data for id:', id);
    const response = await API.get<{ agent: Agent }>(`/agent/get/${id}`);
    return response.data.agent;
  }
);

// Thunk to update agent data
export const updateAgentData = createAsyncThunk<Agent, { id: number; data: Partial<Agent> }>(
  'agent/updateAgentData',
  async ({ id, data }) => {
    console.log('Updating agent data for id:', id);
    const response = await API.put<{ agent: Agent }>(`/agent/update/${id}`, data);
    return response.data.agent;
  }
);

// Thunk to delete agent data
export const deleteAgentData = createAsyncThunk<number, number>(
  'agent/deleteAgentData',
  async (id) => {
    console.log('Deleting agent data for id:', id);
    await API.delete(`/agent/remove/${id}`);
    return id;
  }
);

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      if (state.id !== action.payload) {
        console.log('Setting id:', action.payload);
        state.id = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAgentData.fulfilled, (state, action: PayloadAction<Agent>) => {
      state.agentData = action.payload;
      console.log('Final agent data set in state:', state.agentData);
    });
    builder.addCase(updateAgentData.fulfilled, (state, action: PayloadAction<Agent>) => {
      state.agentData = action.payload;
      console.log('Agent data updated in state:', state.agentData);
    });
    builder.addCase(deleteAgentData.fulfilled, (state, action: PayloadAction<number>) => {
      if (state.id === action.payload) {
        state.id = null;
        state.agentData = null;
        console.log('Agent data deleted for id:', action.payload);
      }
    });
  },
});

export const { setId } = agentSlice.actions;

export default agentSlice.reducer;
