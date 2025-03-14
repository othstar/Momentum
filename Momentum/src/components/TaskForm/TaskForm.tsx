import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.css";

const schema = yup.object().shape({
  taskName: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .required("სავალდებულოა"),
  description: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .required("სავალდებულოა"),
  priority: yup.string().required("სავალდებულოა"),
  status: yup.string().required("სავალდებულოა"),
  department: yup.string().required("სავალდებულოა"),
  person: yup.string().required("სავალდებულოა"),
  dueDate: yup.string().required("სავალდებულოა"),
});

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="task-container container">
      <h2>შექმენი ახალი დავალება</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-fill container">
        {/* Task Name */}
        <div className="form-left">
          <div className="input-container">
            <label>სათაური*</label>
            <input
              type="text"
              {...register("taskName")}
              className={`input-field ${
                errors.taskName
                  ? "error"
                  : touchedFields.taskName
                  ? "valid"
                  : ""
              }`}
            />
            <span
              className={
                errors.taskName && touchedFields.taskName
                  ? "error-text"
                  : touchedFields.taskName
                  ? "valid-text"
                  : "default-text"
              }
            >
              მინიმუმ 2 სიმბოლო
            </span>
            <span
              className={
                errors.taskName && touchedFields.taskName
                  ? "error-text"
                  : touchedFields.taskName
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
                {...register("priority")}
                className={`input-field ${
                  errors.priority
                    ? "error"
                    : touchedFields.priority
                    ? "valid"
                    : ""
                }`}
              >
                <option value="">აირჩიე</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Status */}
            <div className="input-container">
              <label>სტატუსი*</label>
              <select
                {...register("status")}
                defaultValue={"დასაწყები"}
                className={`input-field ${
                  errors.status ? "error" : touchedFields.status ? "valid" : ""
                }`}
              >
                <option>დასაწყები</option>
                <option>პროგრესში</option>
                <option>მზად ტესტირებისთვის</option>
                <option>დასრულებული</option>
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
              defaultValue="დიზაინის დეპარტამენტი"
              className={`input-field ${
                errors.department
                  ? "error"
                  : touchedFields.department
                  ? "valid"
                  : ""
              }`}
            >
              <option>მარკეტინგის დეპარტამენტი</option>
              <option>დიზაინის დეპარტამენტი</option>
              <option>ლოჯისტიკის დეპარტამენტი</option>
              <option>IT დეპარტამენტი</option>
              <option>გაყიდვების დეპარტამენტი</option>
            </select>
          </div>

          {/* Responsible Person */}
          <div className="input-container">
            <label className="collegue">პასუხისმგებელი თანამშრომელი</label>
            <select
              {...register("person")}
              className={`input-field ${
                errors.person ? "error" : touchedFields.person ? "valid" : ""
              }`}
            >
              <option value="">აირჩიე</option>
              <option value="test">test</option>
              <option value="test2">test2</option>
              <option value="test3">test3</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="input-container">
            <label>დედლაინი</label>
            <input
              type="date"
              {...register("dueDate")}
              className={`input-field ${
                errors.dueDate ? "error" : touchedFields.dueDate ? "valid" : ""
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
