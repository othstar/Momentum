import Card from "../../components/Card";
import Filter from "../../components/Filter";
import Statuses from "../../components/Statuses";
import "./style.css";

const Home = () => {
  return (
    <div className="home container">
      <h2>დავალებების გვერდი</h2>
      <Filter />
      <Statuses />
      <Card />
    </div>
  );
};

export default Home;
