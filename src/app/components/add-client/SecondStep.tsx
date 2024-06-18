import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Client } from "../../models/client";
import { FORM_VAL_ERROR } from "../../utils/constants";

interface Props {
  client: Client;
  fundingSources: { id: number; name: string }[];
  errors: Record<string, boolean>;
  touched: Record<string, boolean>;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string) => void;
}

const SecondStep: React.FC<Props> = ({
  client,
  fundingSources,
  errors,
  touched,
  onChange,
  onBlur,
}) => {
  const handleDateBlur = () => {
    onBlur("dob");
  };
  const handleDateChange = (date: Date | null) => {
    onChange("dob", date);
    onBlur("dob");
  };
  return (
    <div className="mt-3 mb-3">
      <h2>Add Client Details</h2>
      <div className="mt-3 mb-3">
        <label className="form-label">Date of birth:</label>
        <div>
          <DatePicker
            className={`form-control ${touched.dob && errors.dob ? "is-invalid" : ""}`}
            selected={client.dob}
            onChange={handleDateChange}
            onBlur={handleDateBlur}
            onCalendarClose={handleDateBlur}
            dateFormat="dd-MM-yyyy"
            isClearable
            placeholderText="Select a date"
          />
          {touched.dob && errors.dob && (
            <div className="invalid-feedback">{FORM_VAL_ERROR}</div>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Funding source:</label>
        <select
          className={`form-select ${touched.funding_source && errors.funding_source ? "is-invalid" : ""}`}
          value={client.funding_source}
          onChange={(e) => onChange("funding_source", e.target.value)}
          onBlur={() => onBlur("funding_source")}
          required
        >
          <option value="">Choose funding source</option>
          {fundingSources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
        {touched.funding_source && errors.funding_source && (
          <div className="invalid-feedback">{FORM_VAL_ERROR}</div>
        )}
      </div>
    </div>
  );
};

export default SecondStep;
