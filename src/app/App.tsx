import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Routes as PATH } from "./utils/constants";
import { AppRoutes } from "./routes/routes";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link ms-3" to={PATH.Home}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-3" to={PATH.AddClient}>
                  New Client
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default App;
