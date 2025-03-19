import { useQuery } from "@tanstack/react-query";
import { fetchStatuses, fetchTasks } from "../../config/API/fetchers";
import "./style.css";
import { Status, TaskFormData } from "../../static/types";
import { NavLink } from "react-router-dom";
import Comment from "../../assets/Images/Comments.png";

const Card = () => {
  const {
    data: statuses,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  const {
    data: tasks,
    error: taskError,
    isLoading: taskLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading || taskLoading) return <div>Loading...</div>;
  if (error instanceof Error || taskError instanceof Error)
    return (
      <div>
        Error: {error?.message} || {taskError?.message}
      </div>
    );

  return (
    <div className="cards">
      {statuses?.map((status: Status) => {
        const filteredTasks = tasks?.filter(
          (task: TaskFormData) => task.status?.id === status.id
        );

        return (
          <div className="status">
            <div
              key={status.id}
              className={`status-bar ${
                status.id === 1
                  ? "starter"
                  : status.id === 2
                  ? "in-progress"
                  : status.id === 3
                  ? "ready-for-test"
                  : status.id === 4
                  ? "finished"
                  : ""
              }`}
            >
              <h3>{status.name}</h3>
            </div>
            <div className="card-container">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task: TaskFormData) => (
                  <NavLink to={`tasks/${task.id}`} key={task.id}>
                    <div
                      className={`card type-${
                        task.status.id === 1
                          ? "starter"
                          : task.status.id === 2
                          ? "in-progress"
                          : task.status.id === 3
                          ? "ready-for-test"
                          : task.status.id === 4
                          ? "finished"
                          : ""
                      }`}
                    >
                      <div className="upper-card">
                        <div className="upper-left-card">
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
                            <img src={task.priority.icon} alt="Shape" />
                            <span>{task.priority.name}</span>
                          </div>
                          <div
                            className={`departments ${
                              task.department.name ===
                              "ტექნოლოგიების დეპარტამენტი"
                                ? "IT"
                                : task.department.name ===
                                  "ლოჯოსტიკის დეპარტამენტი"
                                ? "logistic"
                                : task.department.name ===
                                  "გაყიდვები და მარკეტინგის დეპარტამენტი"
                                ? "marketing"
                                : ""
                            }`}
                          >
                            <span>
                              {`${
                                task.department.name ===
                                "ტექნოლოგიების დეპარტამენტი"
                                  ? "ინფ. ტექ."
                                  : task.department.name ===
                                    "ლოჯოსტიკის დეპარტამენტი"
                                  ? "ლოჯისტიკა"
                                  : task.department.name ===
                                    "გაყიდვები და მარკეტინგის დეპარტამენტი"
                                  ? "მარკეტინგი"
                                  : "ად. რეს."
                              }`}
                            </span>
                          </div>
                        </div>

                        <div className="upper-right-card">
                          <span>
                            {task.due_date
                              ? new Date(task.due_date).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="card-description">
                        <h3>{task.name} </h3>
                        <p>
                          {task.description.length > 100
                            ? `${task.description.substring(0, 100)}...`
                            : task.description}
                        </p>
                      </div>
                      <div className="card-footer">
                        <img
                          src={task.employee.avatar}
                          alt="avatar"
                          className="employee-avatar"
                        />
                        <img src={Comment} alt="Comment" />
                      </div>
                    </div>
                  </NavLink>
                ))
              ) : (
                <p>No tasks available</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
