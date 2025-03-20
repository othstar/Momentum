import "./style.css";
import Shape from "../../assets/Images/Shape.png";
import FilterModal from "../FilterModal";

const Filter = () => {
  const departmentFilters = [
    "მარკეტინგის დაფინანსება",
    "ფინანსების დეპარტამენტი",
    "ლოჯისტიკის დაფინანსება",
    "IT დეპარტამენტი",
  ];

  return (
    <div className="filter-container">
      <FilterModal
        buttonLabel="დეპარტამენტი"
        filterOptions={departmentFilters}
      />
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
