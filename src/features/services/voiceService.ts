import API from "../../utils/API";

// Service function to fetch voice list
export const fetchVoiceList = async (): Promise<any> => {
  const response = await API.get("/voice/getList");
  return response.data;
};
