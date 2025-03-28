import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./style.css";

type FilterModalProps = {
  buttonLabel: string;
  filterOptions: string[];
};

const FilterModal = ({ buttonLabel, filterOptions }: FilterModalProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter]
    );
  };

  useEffect(() => {
    if (modalIsOpen) {
      const handleScroll = () => {
        closeModal();
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [modalIsOpen]);

  const buttonText = selectedFilters.length
    ? `${buttonLabel} (${selectedFilters.length})`
    : buttonLabel;

  return (
    <>
      <button className="filter-button" onClick={openModal}>
        {buttonText}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="filter-modal"
        overlayClassName="filter-overlay"
      >
        <div className="filter-content">
          <ul>
            {filterOptions.map((filter) => (
              <li key={filter}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter)}
                    onChange={() => toggleFilter(filter)}
                  />
                  {filter}
                </label>
              </li>
            ))}
          </ul>
          <div className="apply-container">
            <button className="apply-button" onClick={closeModal}>
              არჩევა
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FilterModal;
