import "./style.css";
import { useState } from "react";
import Modal from "react-modal";

const MyModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

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
        <div className="burger-container">
          <span>gamarjoba</span>
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
