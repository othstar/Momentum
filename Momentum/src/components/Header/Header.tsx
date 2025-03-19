import "./style.css";
import Logo from "../../assets/Images/Hourglass.png";
import { NavLink } from "react-router-dom";
import MyModal from "../Modal";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <NavLink to={"/"}>
          <div className="header-left">
            <span>Momentum</span>
            <img src={Logo} alt="Momentum-Logo" />
          </div>
        </NavLink>
        <div className="header-right">
          <div className="register-user">
            <MyModal />
          </div>
          <NavLink to="/addtask">
            <div className="new-task">
              <span>+</span>
              <span>შექმენი ახალი დავალება</span>
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
