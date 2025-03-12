import Footer from "../components/Footer";
import Header from "../components/Header";
import Router from "../router";

const Layout = () => {
  return (
    <div className="layout-cotainer">
      <div className="header-container" style={{ position: "sticky", top: 0 }}>
        <Header />
      </div>
      <div className="main-container">
        <Router />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
