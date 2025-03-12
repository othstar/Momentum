import { useQuery } from "@tanstack/react-query";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { fetchStatuses } from "../config/API/fetchers";
import Router from "../router";

const Layout = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: fetchStatuses,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  return (
    <div
      className="layout-cotainer"
      style={{ width: "100vw", minHeight: "100vh" }}
    >
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <Router />
      </div>
      <div className="test">
        <ul>
          {data?.map((status: { id: number; name: string; icon: string }) => (
            <li key={status.id}>
              <img src={status.icon} alt={status.name} />
              {status.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
