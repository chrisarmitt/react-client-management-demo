import React from "react";
import { Client } from "../../models/client";
import { FORM_VAL_ERROR } from "../../utils/constants";

interface Props {
  client: Client;
  errors: Record<string, boolean>;
  touched: Record<string, boolean>;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string) => void;
}

const FirstStep: React.FC<Props> = ({
  client,
  errors,
  touched,
  onChange,
  onBlur,
}) => {
  return (
    <div className="mt-3 mb-3">
      <h2>Add Client Details</h2>
      <div className="mt-3 mb-3">
        <label className="form-label">Name:</label>
        <input
          type="text"
          className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
          value={client.name}
          onChange={(e) => onChange("name", e.target.value)}
          onBlur={() => onBlur("name")}
          required
        />
        {touched.name && errors.name && (
          <div className="invalid-feedback">{FORM_VAL_ERROR}</div>
        )}
      </div>
      <div className="mt-3 mb-3">
        <label className="form-label">Primary language:</label>
        <input
          type="text"
          className={`form-control ${touched.primary_language && errors.primary_language ? "is-invalid" : ""}`}
          value={client.primary_language}
          onChange={(e) => onChange("primary_language", e.target.value)}
          onBlur={() => onBlur("primary_language")}
          required
        />
        {touched.primary_language && errors.primary_language && (
          <div className="invalid-feedback">{FORM_VAL_ERROR}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Secondary language:</label>
        <input
          type="text"
          className="form-control"
          value={client.secondary_language}
          onChange={(e) => onChange("secondary_language", e.target.value)}
          onBlur={() => onBlur("secondary_language")}
        />
      </div>
    </div>
  );
};

export default FirstStep;
