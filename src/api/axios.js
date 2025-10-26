import axios from "axios";

const API_URL = "https://taskmanagement-backend-55hv.onrender.com/api";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = async () => {
  try {
    const response = await instance.get(`/tasks/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await instance.post(`/tasks/add`, task);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding task", error);
    throw error;
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await instance.patch(`/tasks/update/${id}`, task);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await instance.delete(`/tasks/delete/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting task", error);
    throw error;
  }
};

export const signUp = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error signing up", error);
    throw error;
  }
};

export const logIn = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signin`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error loggin in", error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/forgotPass`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending forgot password link", error);
    throw error;
  }
};

export const resetPass = async (token, newPass) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/resetPass/${token}`,
      { newPass },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error resetting password", error);
    throw error;
  }
};
