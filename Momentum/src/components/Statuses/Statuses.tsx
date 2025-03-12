import { useQuery } from "@tanstack/react-query";
import { fetchStatuses } from "../../config/API/fetchers";
import "./style.css";

const Statuses = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  return (
    <div className="status-bar container">
      {data?.map((status: { id: number; name: string; icon: string }) => (
        <div
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
