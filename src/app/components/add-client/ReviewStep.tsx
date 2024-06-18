import React from "react";
import { Client } from "../../models/client";
import { formatDateString } from "../../utils/constants";

interface Props {
  client: Client;
  fundingSources: { id: number; name: string }[];
}

const ReviewStep: React.FC<Props> = ({ client, fundingSources }) => {
  const getFundingSourceName = (id: any | undefined) => {
    if (id === undefined) return "";
    const source = fundingSources.find((fs) => fs.id.toString() === id);
    return source ? source.name : "";
  };
  return (
    <div className="mt-3 mb-3">
      <h2 className="mb-3">Review Client Details</h2>
      <div className="row details-row mb-3">
        <div className="col-md-3">
          <label className="form-label fw-bold">Name:</label>
        </div>
        <div className="col-md-9">
          <span className="form-value">{client.name}</span>
        </div>
      </div>
      <div className="row details-row mb-3">
        <div className="col-md-3">
          <label className="form-label fw-bold">Primary language:</label>
        </div>
        <div className="col-md-9">
          <span className="form-value">{client.primary_language}</span>
        </div>
      </div>
      {client.secondary_language && (
        <div className="row details-row mb-3">
          <div className="col-md-3">
            <label className="form-label fw-bold">Secondary language:</label>
          </div>
          <div className="col-md-9">
            <span className="form-value">{client.secondary_language}</span>
          </div>
        </div>
      )}
      <div className="row details-row mb-3">
        <div className="col-md-3">
          <label className="form-label fw-bold">Date of birth:</label>
        </div>
        <div className="col-md-9">
          <span className="form-value">
            {client.dob ? formatDateString(client.dob) : ""}
          </span>
        </div>
      </div>
      <div className="row details-row mb-3">
        <div className="col-md-3">
          <label className="form-label fw-bold">Funding source:</label>
        </div>
        <div className="col-md-9">
          <span className="form-value">
            {getFundingSourceName(client.funding_source)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
