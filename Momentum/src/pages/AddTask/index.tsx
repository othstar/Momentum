import "./style.css";
import { TaskFormData } from "../../static/types";
import { useState } from "react";

const AddTask = () => {
  return (
    <div className="task-container container">
      <h2>შექმენი ახალი დავალება</h2>
      <div className="form-container container">
        <form action="" className="form-fill">
          <div className="form-left">
            <div>
              <label className="task-name">დავალების სახელი</label>
              <input
                type="text"
                name="task-name"
                // value={}
                // onChange={}
                className=""
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="description">დავალების აღწერა</label>
              <textarea
                name="description"
                // value={}
                // onChange={}
                className=""
                maxLength={100}
                placeholder="მაქსიმუმ 100 სიმბოლო..."
              />
            </div>

            {/* Priority */}
            <div>
              <label className="priority">დავალების პრიორიტეტი</label>
              <select
                name="priority"
                // value={}
                // onChange={}
                className=""
              >
                <option value="low">⬇️ Low</option>
                <option value="medium">⚖️ Medium</option>
                <option value="high">🔥 High</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="status">სტატუსი</label>
              <select
                name="status"
                // value={}
                // onChange={}
                className=""
              >
                <option value="low">⬇️ Low</option>
                <option value="medium">⚖️ Medium</option>
                <option value="high">🔥 High</option>
              </select>
            </div>
          </div>
          <div className="form-right">
            {/* Department */}
            <div>
              <label className="department-name">დეპარტამენტის სახელი</label>
              <input
                type="text"
                name="department"
                // value={}
                // onChange={}
                className=""
                required
              />
            </div>

            {/* Employee Image Upload */}
            <div>
              <label className="image">
                პასუხისმგებელი თანამშრომლის სურათი
              </label>
              <input
                type="file"
                accept="image/*"
                // onChange={}
                className=""
                required
              />

              <img
                // src={}
                alt="Employee"
                className=""
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="dueDate">დედლაინი</label>
              <input
                type="date"
                name="dueDate"
                // value={}
                // onChange={}
                className=""
                required
              />
            </div>
          </div>
          {/* Submit Button */}
          <button type="submit" className="">
            დავალების დამატება
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
