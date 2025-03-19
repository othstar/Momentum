import Card from "../../components/Card";
import Filter from "../../components/Filter";
import "./style.css";

const Home = () => {
  return (
    <div className="home">
      <h2>დავალებების გვერდი</h2>
      <Filter />
      <Card />
    </div>
  );
};

export default Home;
