import { useState } from "react";
import "./style.css";
import Modal from "react-modal";
const FilterModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="filter-button"></div>
      <Modal
        onAfterOpen={() => (document.body.style.overflow = "hidden")}
        onAfterClose={() => (document.body.style.overflow = "auto")}
        className="employee-modal"
        overlayClassName="employee-overlay"
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
      ></Modal>
    </>
  );
};

export default FilterModal;
