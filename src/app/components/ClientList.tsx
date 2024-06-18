import React, { useEffect, useState } from "react";
import { getClients, deleteClient } from "../services/apiService";
import { formatDateString } from "../utils/constants";

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const data = await getClients();
    setClients(data);
  };

  const handleDelete = async (id: number) => {
    await deleteClient(id);
    fetchClients();
  };

  return (
    <div className="container mt-4 client-list">
      <div className="row row-header">
        <div className="col wide">Client Name</div>
        <div className="col wide">Date of Birth</div>
        <div className="col wide">Primary Language</div>
        <div className="col wide">Secondary Language</div>
        <div className="col wide">Funding Source</div>
        <div className="col narrow"></div>
      </div>
      {clients.map((client) => (
        <div className="row row-body" key={client.id}>
          <div className="col wide">{client.name}</div>
          <div className="col wide">{formatDateString(client.dob)}</div>
          <div className="col wide">{client.primary_language}</div>
          <div className="col wide">{client.secondary_language || "-"}</div>
          <div className="col wide">{client.fundingSource.name}</div>
          <div className="col narrow">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(client.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientList;
