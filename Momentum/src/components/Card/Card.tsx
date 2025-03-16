import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../config/API/fetchers";
import { TaskFormData } from "../../static/types";
import Comments from "../../assets/Images/Comments.png";
import Shape from "../../assets/Images/Shape.png";
import "./style.css";
import { NavLink } from "react-router-dom";

const Card = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="card-container">
      {data?.map((tasks: TaskFormData) => (
        <NavLink to={`tasks/${tasks.id}`}>
          <div className="card" key={tasks.id}>
            <div className="upper-card">
              <div className={"upper-left-card"}>
                <div
                  className={`priority-status ${
                    tasks.priority.name === "დაბალი"
                      ? "card-low"
                      : tasks.priority.name === "მაღალი"
                      ? "card-high"
                      : tasks.priority.name === "საშუალო"
                      ? "card-medium"
                      : ""
                  }`}
                >
                  <img
                    src={Shape}
                    alt="Shape"
                    className={`priority ${
                      tasks.priority.name === "დაბალი"
                        ? "low"
                        : tasks.priority.name === "მაღალი"
                        ? "high"
                        : ""
                    }`}
                  />
                  <span>{tasks.priority.name}</span>
                </div>
                <span
                  className={`departments ${
                    tasks.department.name === "IT დეპარტამენტი"
                      ? "IT"
                      : tasks.department.name === "ლოჯისტიკის დეპარტამენტი"
                      ? "logistic"
                      : tasks.department.name === "დიზაინის დეპარტამენტი"
                      ? "design"
                      : tasks.department.name === "მარკეტინგის დეპარტამენტი"
                      ? "marketing"
                      : ""
                  }`}
                >
                  {`${
                    tasks.department.name === "IT დეპარტამენტი"
                      ? "ინფ. ტექ."
                      : tasks.department.name === "ლოჯისტიკის დეპარტამენტი"
                      ? "ლოჯისტიკა"
                      : tasks.department.name === "დიზაინის დეპარტამენტი"
                      ? "დიზაინი"
                      : tasks.department.name === "მარკეტინგის დეპარტამენტი"
                      ? "მარკეტინგი"
                      : "ად. რეს."
                  }`}
                </span>
              </div>

              <div className="upper-right-card">
                <span>
                  {tasks.due_date
                    ? new Date(tasks.due_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </span>
              </div>
            </div>
            <div className="card-description">
              <h3>{tasks.name} </h3>
              <p>{tasks.description}</p>
            </div>
            <div className="card-footer">
              <img src={tasks.employee.avatar} alt="" />
              <img src={Comments} alt="" />
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Card;
