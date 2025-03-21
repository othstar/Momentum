import "./style.css";
import Shape from "../../assets/Images/Shape.png";
import FilterModal from "../FilterModal";
import {
  fetchDepartments,
  fetchEmployee,
  fetchPriorities,
} from "../../config/API/fetchers";
import { useQuery } from "@tanstack/react-query";
import { Department, Employee, Priority } from "../../static/types";

const Filter = () => {
  const {
    data: departmentsData,
    error: departmentsError,
    isLoading: departmentsLoading,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
  const {
    data: prioritiesData,
    error: prioritiesError,
    isLoading: prioritiesLoading,
  } = useQuery({
    queryKey: ["priorities"],
    queryFn: fetchPriorities,
  });
  const {
    data: employeesData,
    error: employeesError,
    isLoading: employeesLoading,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployee,
  });
  if (departmentsLoading || prioritiesLoading || employeesLoading)
    return <div>Loading...</div>;
  if (
    departmentsError instanceof Error ||
    prioritiesError instanceof Error ||
    employeesError instanceof Error
  ) {
    return (
      <div>
        Error:{" "}
        {departmentsError?.message ||
          prioritiesError?.message ||
          employeesError?.message}
      </div>
    );
  }
  const departmentFilters =
    departmentsData?.map((department: Department) => department.name) || [];

  const priorityFilters =
    prioritiesData?.map((priority: Priority) => priority.name) || [];

  const employeeFilters =
    employeesData?.map((employee: Employee) => (
      <div
        className="employee-filter"
        key={employee.id}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={employee.avatar}
          alt="Avatar"
          style={{ width: "28px", marginRight: "8px" }}
        />
        <span>
          {employee.name} {employee.surname}
        </span>
      </div>
    )) || [];

  return (
    <div className="filter-container">
      <FilterModal
        buttonLabel="დეპარტამენტი"
        filterOptions={departmentFilters}
      />
      {/* <img src={Shape} alt="Shape" /> */}
      <button className="dropdown-button">
        <FilterModal buttonLabel="პრიორიტეტი" filterOptions={priorityFilters} />
      </button>
      <button className="dropdown-button">
        <FilterModal
          buttonLabel="თანამშრომელი"
          filterOptions={employeeFilters}
        />
      </button>
    </div>
  );
};

export default Filter;
