import React from "react";
import { Link } from "react-router-dom";
import { Routes as PATH } from "../../utils/constants";

const ErrorPage: React.FC = () => {
  return (
    <div className="container">
      <div className="mt-3 mb-3">
        <h1>Technical Error</h1>
      </div>
      <div className="mb-3 mb-3">
        <h3>The hamster must have fallen off the wheel ¯\_(ツ)_/¯</h3>
      </div>
      <div className="mb-3 d-flex">
        <span>
          Click <Link to={PATH.Home}>here</Link> to return home and try again.
        </span>
      </div>
    </div>
  );
};

export default ErrorPage;
