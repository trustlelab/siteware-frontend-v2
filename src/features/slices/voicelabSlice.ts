import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchVoiceList } from "../services/voiceService";

// Define the state type
interface VoiceLabState {
  voices: any[] | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: VoiceLabState = {
  voices: null,
  loading: false,
  error: null,
};

// Thunk for fetching voice list
export const fetchVoiceListThunk = createAsyncThunk<any[], void, { rejectValue: string }>(
  "voiceLab/fetchVoiceList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchVoiceList(); // Using the service function
      return response.voices; // Extracting only voices
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch voice list");
    }
  }
);

// Create the voice lab slice
const voiceLabSlice = createSlice({
  name: "voiceLab",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchVoiceList Thunk
    builder
      .addCase(fetchVoiceListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVoiceListThunk.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.voices = action.payload; // Storing voices in the state
        state.error = null;
      })
      .addCase(fetchVoiceListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch voice list";
      });
  },
});

// Export the reducer
export default voiceLabSlice.reducer;
