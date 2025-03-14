import { useQuery } from "@tanstack/react-query";
import { fetchStatuses } from "../../config/API/fetchers";
import "./style.css";
import { Status } from "../../static/types";

const Statuses = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  return (
    <div className="status-bar">
      {data?.map((status: Status) => (
        <div
          key={status.id}
          className={`status ${
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
          {status.name}
        </div>
      ))}
    </div>
  );
};

export default Statuses;
