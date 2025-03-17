import "./style.css";
import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Avatar from "../../assets/Images/Avatar.png";
import Close from "../../assets/Images/Vector.png";
import { useQuery } from "@tanstack/react-query";
import { fetchDepartments, postEmployee } from "../../config/API/fetchers";
import { Department } from "../../static/types";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .matches(
      /^[ა-ჰa-zA-Z]+$/,
      "გამოიყენეთ მხოლოდ ლათინური ან ქართული სიმბოლოები"
    )
    .required("სავალდებულოა"),
  surname: yup
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .matches(
      /^[ა-ჰa-zA-Z]+$/,
      "გამოიყენეთ მხოლოდ ლათინური ან ქართული სიმბოლოები"
    )
    .required("სავალდებულოა"),
  avatar: yup.mixed().required("სავალდებულოა"),
  department_id: yup.string().required("სავალდებულოა"),
});

const MyModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setAvatarPreview(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    try {
      postEmployee(data);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
    reset();
    closeModal();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      event.target.files = null;
    } else {
      setAvatarPreview(null);
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="add-employee">
            <h3>თანამშრომლის დამატება</h3>
            <div className="employee-details">
              <div className="employee-main">
                <div className="input-container">
                  <label>სახელი*</label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`input-field ${
                      errors.name ? "error" : touchedFields.name ? "valid" : ""
                    }`}
                  />
                  <span className={errors.name ? "error-text" : "default-text"}>
                    მინიმუმ 2 სიმბოლო
                  </span>
                  <span className={errors.name ? "error-text" : "default-text"}>
                    მაქსიმუმ 255 სიმბოლო
                  </span>
                </div>
                <div className="input-container">
                  <label>გვარი*</label>
                  <input
                    type="text"
                    {...register("surname")}
                    className={`input-field ${
                      errors.surname
                        ? "error"
                        : touchedFields.surname
                        ? "valid"
                        : ""
                    }`}
                  />
                  <span
                    className={errors.surname ? "error-text" : "default-text"}
                  >
                    მინიმუმ 2 სიმბოლო
                  </span>
                  <span
                    className={errors.surname ? "error-text" : "default-text"}
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
                  className={errors.avatar ? "error" : ""}
                  id="avatar-input"
                  {...register("avatar", {
                    onChange: (event) => handleFileChange(event),
                  })}
                />
                <label htmlFor="avatar-input" className="custom-file-label">
                  <img src={avatarPreview || Avatar} alt="Avatar" />
                </label>
              </div>
            </div>
            <div className="employee-depart-container">
              <div className="input-container">
                <label>დეპარტამენტი*</label>
                <select
                  {...register("department_id")}
                  className={`input-field ${
                    errors.department_id
                      ? "error"
                      : touchedFields.department_id
                      ? "valid"
                      : ""
                  }`}
                >
                  {data?.map((departments: Department) => (
                    <option key={departments.id} value={departments.id}>
                      {departments.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-buttons">
              <button className="cancel" onClick={closeModal}>
                გაუქმება
              </button>
              <button type="submit" className="submit-employee">
                დაამატე თანამშრომელი
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default MyModal;
