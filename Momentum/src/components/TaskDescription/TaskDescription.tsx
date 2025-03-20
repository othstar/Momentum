import { useParams } from "react-router-dom";
import "./style.css";
import {
  fetchStatuses,
  fetchTasks,
  updateTask,
} from "../../config/API/fetchers";
import { useQuery } from "@tanstack/react-query";
import { Status, TaskFormData } from "../../static/types";
import Comments from "../../components/Comments";

const TaskDescription = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const {
    data: statusesData,
    error: statusesError,
    isLoading: statusesLoading,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });
  if (isLoading || statusesLoading) return <div>Loading...</div>;
  if (error instanceof Error || statusesError instanceof Error) {
    return <div>Error: {error?.message || statusesError?.message}</div>;
  }
  const task = data?.find((task: TaskFormData) => task.id === Number(id));

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!task) return;

    const newStatus = statusesData.find(
      (s: Status) => s.name === event.target.value
    );

    if (!newStatus || newStatus.id === undefined) {
      console.error("Invalid status selection:", newStatus);
      return;
    }

    try {
      await updateTask(task.id, { status_id: newStatus.id });
      window.location.reload();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };
  return (
    <div className="details-container">
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
              <img src={task.priority.icon} alt="Shape" />
              <span>{task.priority.name}</span>
            </div>
            <div
              className={`department ${
                task.department.name === "ტექნოლოგიების დეპარტამენტი"
                  ? "IT"
                  : task.department.name === "ლოჯოსტიკის დეპარტამენტი"
                  ? "logistic"
                  : task.department.name ===
                    "გაყიდვები და მარკეტინგის დეპარტამენტი"
                  ? "marketing"
                  : ""
              }`}
            >
              <span>
                {`${
                  task.department.name === "ტექნოლოგიების დეპარტამენტი"
                    ? "ინფ. ტექ."
                    : task.department.name === "ლოჯოსტიკის დეპარტამენტი"
                    ? "ლოჯისტიკა"
                    : task.department.name ===
                      "გაყიდვები და მარკეტინგის დეპარტამენტი"
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
                <select
                  defaultValue={task.status.name}
                  onChange={handleStatusChange}
                >
                  {statusesData?.map((status: Status) => (
                    <option key={status.id}>{status.name}</option>
                  ))}
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
                    <span className="employee-name">
                      {task.employee.name} {task.employee.surname}
                    </span>
                  </div>
                </div>
              </div>
              <div className="task-date">
                <span>დავალების ვადა</span>
                <span>{task.due_date}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No task found</div>
      )}
      <Comments />
    </div>
  );
};

export default TaskDescription;
