import axiosClient from "../api";
import { Employee, PostFormData } from "../../static/types";

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
  const response = await axiosClient.get("/employees");
  return response.data;
};

export const postTask = async (task: PostFormData) => {
  const formData = new FormData();
  formData.append("name", task.name);
  formData.append("description", task.description);
  formData.append("due_date", task.due_date);
  formData.append("employee_id", String(task.employee_id));
  formData.append("status_id", String(task.status_id));
  formData.append("priority_id", String(task.priority_id));

  const response = await axiosClient.post("/tasks", formData);
  return response.data;
};

export const updateTask = async (
  id: number,
  updatedTask: Partial<PostFormData>
) => {
  const response = await axiosClient.put(`/tasks/${id}`, updatedTask, {
    headers: {
      "Content-Type": "application/json",
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
    formData.append("avatar", avatarFile);
  }

  for (let [key, value] of formData.entries()) {
    console.log(`${key}, ${value}`);
  }

  const response = await axiosClient.post("/employees", formData);
  return response.data;
};
