import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import * as Step from "./add-client";
import { Client } from "../models/client";
import { createClient, getFundingSources } from "../services/apiService";
import { Routes as PATH } from "../utils/constants";

const Wizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState<Client>({
    name: "",
    dob: null,
    primary_language: "",
    secondary_language: "",
    funding_source: undefined,
  });
  const [fundingSources, setFundingSources] = useState<
    { id: number; name: string }[]
  >([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFundingSources = async () => {
      try {
        const sources = await getFundingSources();
        setFundingSources(sources);
      } catch (error) {
        console.log("Error fetching funding sources", error);
        navigate(PATH.Error);
      }
    };
    fetchFundingSources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    validateStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, step]);

  const validateField = (field: string, value: any): boolean => {
    if (field === "dob") {
      return value !== null;
    }
    if (field === "funding_source") {
      return value !== 0 && value !== undefined;
    }
    return value.trim() !== "";
  };

  const handleFieldChange = (field: string, value: any) => {
    const isValid = validateField(field, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !isValid,
    }));
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
    setClient((prevClient) => ({
      ...prevClient,
      [field]: value,
    }));
    validateStep();
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
    validateStep();
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    if (step === 1) {
      newErrors.name = !validateField("name", client.name);
      newErrors.primary_language = !validateField(
        "primary_language",
        client.primary_language
      );
    }
    if (step === 2) {
      newErrors.dob = !validateField("dob", client.dob);
      newErrors.funding_source = !validateField(
        "funding_source",
        client.funding_source
      );
    }
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).every((key) => !newErrors[key]);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      setTouched({
        name: true,
        primary_language: true,
        dob: true,
        funding_source: true,
      });
    }
  };

  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (validateStep()) {
      const newClient = {
        ...client,
        dob: client.dob ? format(client.dob, "yyyy-MM-dd") : null,
      };
      try {
        await createClient(newClient);
        resetForm();
        navigate(PATH.Home);
      } catch (error) {
        console.log("Error creating client", error);
        navigate(PATH.Error);
      }
    }
  };

  const resetForm = () => {
    setClient({
      name: "",
      dob: null,
      primary_language: "",
      secondary_language: "",
      funding_source: undefined,
    });
    setErrors({});
    setTouched({});
    setIsFormValid(true);
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="container">
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="wizard-container">
        <div className="wizard-content">
          {step === 1 && (
            <Step.FirstStep
              client={client}
              errors={errors}
              touched={touched}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
          )}
          {step === 2 && (
            <Step.SecondStep
              client={client}
              fundingSources={fundingSources}
              errors={errors}
              touched={touched}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
          )}
          {step === 3 && (
            <Step.ReviewStep client={client} fundingSources={fundingSources} />
          )}
        </div>
        <div className="wizard-navigation">
          {step > 1 && (
            <button className="btn btn-secondary" onClick={handlePrev}>
              Previous
            </button>
          )}
          {step < 3 && (
            <button
              className="btn btn-primary ms-auto"
              onClick={handleNext}
              disabled={!isFormValid && Object.keys(touched).length > 0}
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button className="btn btn-success ms-auto" onClick={handleSubmit}>
              Save Client
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wizard;
