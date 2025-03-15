import axiosClient from "../api";

export const fetchStatuses = async () => {
  const response = await axiosClient.get("/statuses");
  return response.data;
};

export const postTask = async () => {
  const response = await axiosClient.post("/tasks");
  return response.data;
};

export const fetchTasks = async () => {
  const response = await axiosClient.get("/tasks");
  return response.data;
};

export const postEmployee = async () => {
  const response = await axiosClient.post("/employees");
  return response.data;
};
