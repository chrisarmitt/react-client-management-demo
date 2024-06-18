import axios from "axios";
import { API_URL } from "../utils/constants";

// client endpoints
export const getClient = async (id: number) => {
  const response = await axios.get(`${API_URL}/client/${id}`);
  return response.data;
};

export const getClients = async () => {
  const response = await axios.get(`${API_URL}/clients`);
  return response.data;
};

export const createClient = async (client: any) => {
  const response = await axios.post(`${API_URL}/client`, client);
  return response.data;
};

export const updateClient = async (id: number, client: any) => {
  const response = await axios.put(`${API_URL}/client/${id}`, client);
  return response.data;
};

export const deleteClient = async (id: number) => {
  const response = await axios.delete(`${API_URL}/client/${id}`);
  return response.data;
};

// funding source endpoints
export const getFundingSources = async () => {
  const response = await axios.get(`${API_URL}/funding-sources`);
  return response.data;
};
