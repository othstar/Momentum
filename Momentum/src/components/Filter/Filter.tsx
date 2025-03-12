import "./style.css";
import Shape from "../../assets/Images/Shape.png";
const Filter = () => {
  return (
    <div className="filter-container">
      <button className="dropdown-button">
        <span>დეპარტამენტი</span>
        <img src={Shape} alt="Shape" />
      </button>
      <button className="dropdown-button">
        <span>პრიორიტეტი</span>
        <img src={Shape} alt="Shape" />
      </button>
      <button className="dropdown-button">
        <span>თანამშრომელი</span>
        <img src={Shape} alt="Shape" />
      </button>
    </div>
  );
};

export default Filter;
