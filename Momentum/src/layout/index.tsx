import Header from "../components/Header";

import Router from "../router";

const Layout = () => {
  return (
    <div
      className="layout-cotainer"
      style={{ width: "100vw", minHeight: "100vh" }}
    >
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <Router />
      </div>
      <div className="footer-container"></div>
    </div>
  );
};

export default Layout;
