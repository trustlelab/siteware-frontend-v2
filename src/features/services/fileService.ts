import API from "../../utils/API";

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
