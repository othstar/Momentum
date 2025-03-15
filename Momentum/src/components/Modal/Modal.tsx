import "./style.css";
import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Avatar from "../../assets/Images/Avatar.png";
import Close from "../../assets/Images/Vector.png";

const schema = yup.object().shape({
  employeeName: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .required("სავალდებულოა"),
  employeeSurname: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .required("სავალდებულოა"),
  avatar: yup.mixed().required("სავალდებულოა"),
  department: yup.string().required("სავალდებულოა"),
});

const MyModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  return (
    <>
      <div className="employee-button">
        <div className="register-employee">
          <button
            onClick={openModal}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            თანამშრომლის შექმნა
          </button>
        </div>
      </div>
      <Modal
        onAfterOpen={() => (document.body.style.overflow = "hidden")}
        onAfterClose={() => (document.body.style.overflow = "auto")}
        className="employee-modal"
        overlayClassName="employee-overlay"
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
      >
        <img
          src={Close}
          alt="Close Modal"
          className="modal-avatar"
          onClick={closeModal}
        />
        <div className="add-employee">
          <h3>თანამშრომლის დამატება</h3>
          <div className="employee-details">
            <div className="employee-main">
              <div className="input-container">
                <label>სახელი*</label>
                <input
                  type="text"
                  {...register("employeeName")}
                  className={`input-field ${
                    errors.employeeName
                      ? "error"
                      : touchedFields.employeeName
                      ? "valid"
                      : ""
                  }`}
                />
                <span
                  className={
                    errors.employeeName && touchedFields.employeeName
                      ? "error-text"
                      : touchedFields.employeeName
                      ? "valid-text"
                      : "default-text"
                  }
                >
                  მინიმუმ 2 სიმბოლო
                </span>
                <span
                  className={
                    errors.employeeName && touchedFields.employeeName
                      ? "error-text"
                      : touchedFields.employeeName
                      ? "valid-text"
                      : "default-text"
                  }
                >
                  მაქსიმუმ 255 სიმბოლო
                </span>
              </div>
              <div className="input-container">
                <label>გვარი*</label>
                <input
                  type="text"
                  {...register("employeeSurname")}
                  className={`input-field ${
                    errors.employeeName
                      ? "error"
                      : touchedFields.employeeSurname
                      ? "valid"
                      : ""
                  }`}
                />
                <span
                  className={
                    errors.employeeSurname && touchedFields.employeeSurname
                      ? "error-text"
                      : touchedFields.employeeSurname
                      ? "valid-text"
                      : "default-text"
                  }
                >
                  მინიმუმ 2 სიმბოლო
                </span>
                <span
                  className={
                    errors.employeeSurname && touchedFields.employeeSurname
                      ? "error-text"
                      : touchedFields.employeeSurname
                      ? "valid-text"
                      : "default-text"
                  }
                >
                  მაქსიმუმ 255 სიმბოლო
                </span>
              </div>
            </div>
          </div>
          <div className="avatar-container">
            <label>ავატარი*</label>
            <div className="file-upload-container">
              <input
                type="file"
                accept="image/*"
                {...register("avatar")}
                className={errors.avatar ? "error" : ""}
                id="avatar-input"
              />
              <label htmlFor="avatar-input" className="custom-file-label">
                <img src={Avatar} alt="Avatar" />
              </label>
              {errors.avatar && (
                <span className="error-text">{errors.avatar.message}</span>
              )}
            </div>
          </div>
          <div className="employee-depart-container">
            <div className="input-container">
              <label>დეპარტამენტი*</label>
              <select
                {...register("department")}
                defaultValue="დიზაინის დეპარტამენტი"
                className={`input-field ${
                  errors.department
                    ? "error"
                    : touchedFields.department
                    ? "valid"
                    : ""
                }`}
              >
                <option>მარკეტინგის დეპარტამენტი</option>
                <option>დიზაინის დეპარტამენტი</option>
                <option>ლოჯისტიკის დეპარტამენტი</option>
                <option>IT დეპარტამენტი</option>
                <option>გაყიდვების დეპარტამენტი</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
