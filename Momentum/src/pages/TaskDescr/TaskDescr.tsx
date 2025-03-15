import { useParams } from "react-router-dom";
import "./style.css";
import { fetchTasks } from "../../config/API/fetchers";
import { useQuery } from "@tanstack/react-query";
import { TaskFormData } from "../../static/types";
import Shape from "../../assets/Images/Shape.png";

const TaskDescr = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  const task = data?.find((task: TaskFormData) => task.id === Number(id));
  console.log(task);
  return (
    <div className="details-container container">
      {task ? (
        <div className="details-left" key={task.id}>
          <div className="details-status">
            <div
              className={`priority-status ${
                task.priority.name === "დაბალი"
                  ? "card-low"
                  : task.priority.name === "მაღალი"
                  ? "card-high"
                  : task.priority.name === "საშუალო"
                  ? "card-medium"
                  : ""
              }`}
            >
              <img
                src={Shape}
                alt="Shape"
                className={`priority ${
                  task.priority.name === "დაბალი"
                    ? "low"
                    : task.priority.name === "მაღალი"
                    ? "high"
                    : ""
                }`}
              />
              <span>{task.priority.name}</span>
            </div>
            <div
              className={`department ${
                task.department.name === "IT დეპარტამენტი"
                  ? "IT"
                  : task.department.name === "ლოჯისტიკის დეპარტამენტი"
                  ? "logistic"
                  : task.department.name === "დიზაინის დეპარტამენტი"
                  ? "design"
                  : task.department.name === "მარკეტინგის დეპარტამენტი"
                  ? "marketing"
                  : "human-res"
              }`}
            >
              <span>
                {`${
                  task.department.name === "IT დეპარტამენტი"
                    ? "ინფ. ტექ."
                    : task.department.name === "ლოჯისტიკის დეპარტამენტი"
                    ? "ლოჯისტიკა"
                    : task.department.name === "დიზაინის დეპარტამენტი"
                    ? "დიზაინი"
                    : task.department.name === "მარკეტინგის დეპარტამენტი"
                    ? "მარკეტინგი"
                    : "ად. რეს."
                }`}
              </span>
            </div>
          </div>
          <div className="task-main-info">
            <h3>{task.name}</h3>
            <p>{task.description}</p>
          </div>
          <div className="task-details">
            <h4>დავალების დეტალები</h4>
            <div className="alltask-details">
              <div className="status-task">
                <span>სტატუსი</span>
                <select>
                  <option>{task.status.name}</option>
                </select>
              </div>
              <div className="employee-info">
                <span>თანამშრომელი</span>
                <div className="employee-details">
                  <img src={task.employee.avatar} alt="employee" />
                  <div className="employee-name">
                    <span className="employee-department">
                      {task.department.name}
                    </span>
                    <span className="employee-name">{task.employee.name}</span>
                  </div>
                </div>
              </div>
              <div className="task-date">
                <span>დავალების ვადა</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No task found</div>
      )}
      {task ? (
        <div className="details-right" key={task.id}></div>
      ) : (
        <div>No task found</div>
      )}
    </div>
  );
};

export default TaskDescr;
