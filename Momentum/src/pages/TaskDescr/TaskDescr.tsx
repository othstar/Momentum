import { useParams } from "react-router-dom";
import "./style.css";
import { fetchTasks } from "../../config/API/fetchers";
import { useQuery } from "@tanstack/react-query";
import { TaskFormData } from "../../static/types";

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
  return (
    <div className="test">
      {task ? (
        <div className="test-data" key={task.id}>
          {task.id}
        </div>
      ) : (
        <div>No task found</div>
      )}
    </div>
  );
};

export default TaskDescr;
