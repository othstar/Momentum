import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDepartments,
  fetchEmployee,
  fetchPriorities,
  fetchStatuses,
  postTask,
} from "../../config/API/fetchers";
import {
  Department,
  Employee,
  Priority,
  Status,
  TaskFormData,
} from "../../static/types";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .required("სავალდებულოა"),
  description: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .required("სავალდებულოა"),
  priority_id: yup.string().required("სავალდებულოა"),
  department: yup.string().required("სავალდებულოა"),
  status_id: yup.string().required("სავალდებულოა"),
  employee_id: yup.string().required("სავალდებულოა"),
  due_date: yup.string().required("სავალდებულოა"),
});

const TaskForm = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      await postTask(data);
      window.location.reload();
    } catch (error) {
      console.error("Failed to post task", error);
    }
  };

  const {
    data: departmentsData,
    error: departmentsError,
    isLoading: departmentsLoading,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const {
    data: statusesData,
    error: statusesError,
    isLoading: statusesLoading,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const {
    data: prioritiesData,
    error: prioritiesError,
    isLoading: prioritiesLoading,
  } = useQuery({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });

  const {
    data: employeesData,
    error: employeesError,
    isLoading: employeesLoading,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployee,
  });

  if (
    departmentsLoading ||
    statusesLoading ||
    prioritiesLoading ||
    employeesLoading
  )
    return <div>Loading...</div>;
  if (
    departmentsError instanceof Error ||
    statusesError instanceof Error ||
    prioritiesError instanceof Error ||
    employeesError instanceof Error
  ) {
    return (
      <div>
        Error:{" "}
        {departmentsError?.message ||
          statusesError?.message ||
          prioritiesError?.message}
      </div>
    );
  }
  return (
    <div className="task-container">
      <h2>შექმენი ახალი დავალება</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-fill container">
        {/* Task Name */}
        <div className="form-left">
          <div className="input-container">
            <label>სათაური*</label>
            <input
              type="text"
              {...register("name")}
              className={`input-field ${
                errors.name ? "error" : touchedFields.name ? "valid" : ""
              }`}
            />
            <span
              className={
                errors.name && touchedFields.name
                  ? "error-text"
                  : touchedFields.name
                  ? "valid-text"
                  : "default-text"
              }
            >
              მინიმუმ 2 სიმბოლო
            </span>
            <span
              className={
                errors.name && touchedFields.name
                  ? "error-text"
                  : touchedFields.name
                  ? "valid-text"
                  : "default-text"
              }
            >
              მაქსიმუმ 255 სიმბოლო
            </span>
          </div>

          {/* Description */}
          <div className="input-container">
            <label>აღწერა</label>
            <textarea
              {...register("description")}
              className={`input-field ${
                errors.description
                  ? "error"
                  : touchedFields.description
                  ? "valid"
                  : ""
              }`}
            />
            <span
              className={
                errors.description && touchedFields.description
                  ? "error-text"
                  : touchedFields.description
                  ? "valid-text"
                  : "default-text"
              }
            >
              მინიმუმ 2 სიმბოლო
            </span>
            <span
              className={
                errors.description && touchedFields.description
                  ? "error-text"
                  : touchedFields.description
                  ? "valid-text"
                  : "default-text"
              }
            >
              მაქსიმუმ 255 სიმბოლო
            </span>
          </div>

          {/* Priority */}
          <div className="priority-status">
            <div className="input-container">
              <label>პრიორიტეტი*</label>
              <select
                {...register("priority_id")}
                className={`input-field ${
                  errors.priority_id
                    ? "error"
                    : touchedFields.priority_id
                    ? "valid"
                    : ""
                }`}
                // defaultValue={}
              >
                {prioritiesData?.map((priority: Priority) => (
                  <option value={priority.id} key={priority.id}>
                    <img src={priority.icon} alt="icon" />
                    <span>{priority.name}</span>
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="input-container">
              <label>სტატუსი*</label>
              <select
                {...register("status_id")}
                className={`input-field ${
                  errors.status_id
                    ? "error"
                    : touchedFields.status_id
                    ? "valid"
                    : ""
                }`}
              >
                {statusesData?.map((status: Status) => (
                  <option value={status.id} key={status.id}>
                    {" "}
                    {status.name}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-right">
          {/* Department */}
          <div className="input-container">
            <label>დეპარტამენტი*</label>
            <select
              {...register("department")}
              className={`input-field ${
                errors.department
                  ? "error"
                  : touchedFields.department
                  ? "valid"
                  : ""
              }`}
              onChange={handleDepartmentChange}
            >
              {departmentsData?.map((department: Department) => {
                return (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Responsible Person */}
          <div className="input-container">
            <label className="collegue">პასუხისმგებელი თანამშრომელი</label>
            <select
              {...register("employee_id")}
              className={`input-field ${
                errors.employee_id
                  ? "error"
                  : touchedFields.employee_id
                  ? "valid"
                  : ""
              }`}
            >
              {employeesData
                ?.filter((employee: TaskFormData) => {
                  return employee.department.id === Number(selectedDepartment);
                })
                .map((employee: Employee) => (
                  <option key={employee.id} value={employee.id}>
                    {`${employee.name} ${employee.surname}`}
                  </option>
                ))}
            </select>
          </div>

          {/* Due Date */}
          <div className="input-container">
            <label>დედლაინი</label>
            <input
              type="date"
              {...register("due_date")}
              className={`input-field ${
                errors.due_date
                  ? "error"
                  : touchedFields.due_date
                  ? "valid"
                  : ""
              }`}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            დავალების შექმნა
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
