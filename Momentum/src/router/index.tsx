import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddTask from "../pages/AddTask";
import TaskDescr from "../pages/TaskDescr";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addtask" element={<AddTask />} />
      <Route path="/tasks/:id" element={<TaskDescr />} />
    </Routes>
  );
};

export default Router;
