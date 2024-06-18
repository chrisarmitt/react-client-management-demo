export const API_URL = "http://localhost:5000";

export const FORM_VAL_ERROR = "This field is required.";

export const Routes = {
  Root: "/",
  Home: "/home",
  AddClient: "/add-client",
};

export const APP_ROOT = "root";

// shared functions

export const formatDateString = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(new Date(date))
    .replace(/\//g, "-");
};
