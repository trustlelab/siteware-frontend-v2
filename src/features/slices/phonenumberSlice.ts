import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/API';

interface PhoneNumber {
  id: number; // Change this to number instead of string
  phoneNumber: string;
  label: string;
}

interface PhoneNumberState {
  phoneNumbers: PhoneNumber[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PhoneNumberState = {
  phoneNumbers: [], // Initialize as an empty array to avoid undefined state
  status: 'idle',
  error: null,
};

// Thunk to fetch all phone numbers
export const fetchPhoneNumbers = createAsyncThunk<PhoneNumber[]>('phoneNumber/fetchPhoneNumbers', async () => {
  const response = await API.get<PhoneNumber[]>('/twilio/list-numbers');
  return response.data;
});

// Thunk to add a new phone number
export const addPhoneNumber = createAsyncThunk<PhoneNumber, { phoneNumber: string; label: string; accountSid: string; authToken: string }>(
  'phoneNumber/addPhoneNumber',
  async (newNumber, { rejectWithValue }) => {
    try {
      const response = await API.post<{ status: number; phoneNumber: PhoneNumber }>('/twilio/add-number', newNumber);
      return {
        ...response.data.phoneNumber,
        id: Number(response.data.phoneNumber.id), // Ensure id is a number
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add phone number');
    }
  }
);

// Thunk to remove a phone number
export const removePhoneNumber = createAsyncThunk<string, string>('phoneNumber/removePhoneNumber', async id => {
  await API.delete<{ status: number }>(`/twilio/remove-number/${id}`);
  return id;
});

export const updatePhoneNumberLabel = createAsyncThunk<PhoneNumber, { id: number; label: string }>(
  'phoneNumber/updatePhoneNumberLabel',
  async ({ id, label }, { rejectWithValue }) => {
    try {
      // Call API and await the response
      const response = await API.put<{ message: string; id: string; label: string }>(`/twilio/update-number/${id}`, { label });

      // Log the API response to check if the format is correct
      console.log('API response (successful):', response.data);

      // Check if the response contains the necessary fields
      if (response.data && response.data.id && response.data.label) {
        // Return the correct structure, converting id to a number
        return {
          id: Number(response.data.id), // Convert the id to a number
          phoneNumber: '', // Adjust the phoneNumber field as needed
          label: response.data.label, // Use the label from the response
        };
      } else {
        throw new Error('Invalid response format'); // Throw error if format is incorrect
      }
    } catch (error: any) {
      console.error('Caught error in thunk:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to update phone number');
    }
  }
);

// Thunk to set up a webhook for a phone number
export const setupWebhook = createAsyncThunk<PhoneNumber, { phoneNumber: string; label: string; webhookUrl: string }>(
  'phoneNumber/setupWebhook',
  async webhookData => {
    const response = await API.post<{ status: number; phoneNumber: PhoneNumber }>('/twilio/setup-webhook', webhookData);
    return {
      ...response.data.phoneNumber,
      id: Number(response.data.phoneNumber.id), // Ensure id is a number
    };
  }
);

// Slice definition
const phoneNumberSlice = createSlice({
  name: 'phoneNumber',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhoneNumbers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPhoneNumbers.fulfilled, (state, action: PayloadAction<PhoneNumber[]>) => {
        state.phoneNumbers = action.payload || [];
        state.status = 'succeeded';
      })
      .addCase(fetchPhoneNumbers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch phone numbers';
      })
      .addCase(addPhoneNumber.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addPhoneNumber.fulfilled, (state, action: PayloadAction<PhoneNumber>) => {
        state.phoneNumbers.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addPhoneNumber.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to add phone number';
      })
      .addCase(removePhoneNumber.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removePhoneNumber.fulfilled, (state, action: PayloadAction<string>) => {
        state.phoneNumbers = state.phoneNumbers.filter(phoneNumber => phoneNumber.id !== parseInt(action.payload));
        state.status = 'succeeded';
      })
      .addCase(removePhoneNumber.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to remove phone number';
      })
      .addCase(updatePhoneNumberLabel.pending, state => {
        state.status = 'loading';
        state.error = null; // Clear any existing error
      })
      .addCase(updatePhoneNumberLabel.fulfilled, (state, action: PayloadAction<PhoneNumber>) => {
        console.log('Action payload with numeric id:', action.payload);
        const index = state.phoneNumbers.findIndex(phoneNumber => phoneNumber.id === action.payload.id);
        if (index !== -1) {
          state.phoneNumbers[index] = action.payload;
        } else {
          console.error('Phone number not found in state');
        }
        state.status = 'succeeded';
      })
      .addCase(updatePhoneNumberLabel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update phone number'; // Log the actual error
      })
      .addCase(setupWebhook.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(setupWebhook.fulfilled, (state, action: PayloadAction<PhoneNumber>) => {
        const index = state.phoneNumbers.findIndex(phoneNumber => phoneNumber.phoneNumber === action.payload.phoneNumber);
        if (index !== -1) {
          state.phoneNumbers[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(setupWebhook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to set up webhook';
      });
  },
});

export default phoneNumberSlice.reducer;
