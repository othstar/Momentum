import "./style.css";
import Logo from "../../assets/Images/Hourglass.png";

const Header = () => {
  return (
    <header>
      <div className="header-container container">
        <div className="header-left">
          <span>Momentum</span>
          <img src={Logo} alt="Momentum-Logo" />
        </div>
        <div className="header-right">
          <div className="register-user">
            <span>თანამშრომლის შექმნა</span>
          </div>
          <div className="new-task">
            <span>+</span>
            <span>შექმენი ახალი დავალება</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
