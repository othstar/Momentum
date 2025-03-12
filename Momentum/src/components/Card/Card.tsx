import "./style.css";

const Card = () => {
  return (
    <div className="card-container container">
      <div className="card">
        <div className="upper-card">
          <div className="upper-left-card"></div>
          <div className="upper-right-card"></div>
        </div>
        <div className="card-description"></div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
};

export default Card;
