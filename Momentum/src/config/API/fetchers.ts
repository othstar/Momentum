import axiosClient from "../api";

export const fetchStatuses = async () => {
  const response = await axiosClient.get("/statuses");
  return response.data;
};
