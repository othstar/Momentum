import axiosClient from "../api";
import { Employee, TaskFormData } from "../../static/types";

export const fetchStatuses = async () => {
  const response = await axiosClient.get("/statuses");
  return response.data;
};
export const fetchDepartments = async () => {
  const response = await axiosClient.get("/departments");
  return response.data;
};

export const fetchPriorities = async () => {
  const response = await axiosClient.get("/priorities");
  return response.data;
};

export const fetchTasks = async () => {
  const response = await axiosClient.get("/tasks");
  return response.data;
};

export const fetchEmployee = async () => {
  const response = await axiosClient.post("/employees");
  return response.data;
};

export const postTask = async (task: TaskFormData) => {
  const formData = new FormData();
  formData.append("task", JSON.stringify(task));

  const response = await axiosClient.post("/tasks", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const postEmployee = async (employee: Employee) => {
  const formData = new FormData();

  formData.append("name", employee.name);
  formData.append("surname", employee.surname);
  formData.append("department_id", String(employee.department_id));

  let avatarFile = employee.avatar;
  if (avatarFile instanceof FileList) {
    avatarFile = avatarFile.length > 0 ? avatarFile[0] : null;
  }

  if (avatarFile instanceof File) {
    console.log("Appending File:", avatarFile);
    formData.append("avatar", avatarFile);
  }

  for (let [key, value] of formData.entries()) {
    console.log(`${key}, ${value}`);
  }

  const response = await axiosClient.post("/employees", formData);
  return response.data;
};
