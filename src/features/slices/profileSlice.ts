import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/API';

interface UserProfile {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  avatarUrl: string | null;
  email: string;
}

interface UserProfileState {
  profile: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

// Thunk to fetch user profile data
export const fetchUserProfile = createAsyncThunk<UserProfile>('userProfile/fetchUserProfile', async () => {
  const response = await API.get<{ status: number; user: UserProfile }>('/auth/profile');
  return response.data.user;
});

// Thunk to update user profile avatar
export const updateProfileAvatar = createAsyncThunk<UserProfile, FormData>('userProfile/updateProfileAvatar', async (formData) => {
  const response = await API.put<{ status: number; user: UserProfile }>('/auth/update-profile-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.user;
});

// Thunk to update user profile information
export const updateUserProfile = createAsyncThunk<UserProfile, Partial<UserProfile>>('userProfile/updateUserProfile', async (profileData) => {
  const response = await API.put<{ status: number; user: UserProfile }>('/auth/profile', profileData);
  return response.data.user;
});

// Thunk to remove user profile avatar
export const removeProfileAvatar = createAsyncThunk<UserProfile>('userProfile/removeProfileAvatar', async () => {
  const response = await API.delete<{ status: number; user: UserProfile }>('/auth/remove-profile-avatar');
  return response.data.user;
});

// Thunk to remove user account
export const removeUserAccount = createAsyncThunk<void>('userProfile/removeUserAccount', async () => {
  await API.delete<{ status: number }>('/auth/remove-account');
});

// Thunk to update user password
export const updatePassword = createAsyncThunk<
  void,
  {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
>('userProfile/updatePassword', async (passwordData) => {
  await API.post<{ status: number }>('/auth/update-password', passwordData);
});

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  /**
   *
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user profile';
      })
      .addCase(updateProfileAvatar.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfileAvatar.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateProfileAvatar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update profile avatar';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update user profile';
      })
      .addCase(removeProfileAvatar.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeProfileAvatar.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(removeProfileAvatar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to remove profile avatar';
      })
      .addCase(removeUserAccount.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeUserAccount.fulfilled, (state) => {
        state.profile = null;
        state.status = 'succeeded';
      })
      .addCase(removeUserAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to remove user account';
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update password';
      });
  },
});

export default userProfileSlice.reducer;
