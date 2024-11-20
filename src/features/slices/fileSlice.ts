import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../utils/API"; // Importing your API helper

// Define the structure of the File
interface File {
  id: number;
  fileName: string;
  label: string;
  uuid: string;
  url: string;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

// Define the state type
interface FileState {
  files: File[] | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: FileState = {
  files: null,
  loading: false,
  error: null,
};

// Service functions

// Fetch the list of files
export const fetchFileList = async () => {
  const response = await API.get("/file/list");
  return response.data;
};

// Upload a file
export const uploadFile = async (fileData: FormData) => {
  const response = await API.post("/file/upload", fileData);
  return response.data;
};

// Delete a file
export const deleteFile = async (fileId: number) => {
  const response = await API.delete(`/file/delete/${fileId}`);
  return response.data;
};

export const fetchFileListThunk = createAsyncThunk<File[], void, { rejectValue: string }>(
    "file/fetchFileList",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetchFileList();
        return (response as { files: File[] }).files; // Assert the type of response
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch file list");
      }
    }
  );
  

  export const uploadFileThunk = createAsyncThunk<File, FormData, { rejectValue: string }>(
    "file/uploadFile",
    async (fileData, { rejectWithValue }) => {
      try {
        const response = await uploadFile(fileData);
        return (response as { file: File }).file; // Assert the type of response to expect a 'file' object
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to upload file");
      }
    }
  );
  
// Thunk for deleting a file by ID
export const deleteFileThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  "file/deleteFile",
  async (fileId, { rejectWithValue }) => {
    try {
      await deleteFile(fileId);
      return fileId; // Return the ID of the deleted file
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete file");
    }
  }
);

// Create the file slice
const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchFileList Thunk
    builder
      .addCase(fetchFileListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFileListThunk.fulfilled, (state, action: PayloadAction<File[]>) => {
        state.loading = false;
        state.files = action.payload;
        state.error = null;
      })
      .addCase(fetchFileListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch file list";
      });

    // Handle uploadFile Thunk
    builder
      .addCase(uploadFileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFileThunk.fulfilled, (state, action: PayloadAction<File>) => {
        state.loading = false;
        state.files = state.files ? [...state.files, action.payload] : [action.payload];
        state.error = null;
      })
      .addCase(uploadFileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to upload file";
      });

    // Handle deleteFile Thunk
    builder
      .addCase(deleteFileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFileThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.files = state.files?.filter((file) => file.id !== action.payload) || null; // Remove file by ID
        state.error = null;
      })
      .addCase(deleteFileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete file";
      });
  },
});

// Export the reducer
export default fileSlice.reducer;
