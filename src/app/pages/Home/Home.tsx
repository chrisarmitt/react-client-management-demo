import React from "react";
import { useNavigate } from "react-router-dom";
import ClientList from "../../components/ClientList";
import { Routes as PATH } from "../../utils/constants";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const addClient = () => {
    navigate(PATH.AddClient);
  };

  return (
    <div className="container">
      <div className="mt-3 mb-3">
        <h1>Client Records</h1>
        <ClientList />
      </div>
      <div className="mb-3 d-flex">
        <button className="btn btn-primary" onClick={addClient}>
          Add Client
        </button>
      </div>
    </div>
  );
};

export default Home;
