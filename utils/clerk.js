import React from "react";

export const useClerkFieldState = () => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);
  return { value, setValue, error, setError };
};

export const buildClerkRequest = (fields) => {
  const requestMap = {};
  for (const paramName in fields) {
    requestMap[paramName] = fields[paramName].value;
  }
  return requestMap;
};

export const handleClerkError = (error, fields) => {
  if (error.status >= 400 && error.status < 500) {
    for (const paramName in fields) {
      const fieldError = error.errors.find((x) => {
        console.log("fieldmatch", paramName, x.meta.paramName);
        return paramName === x.meta.paramName;
      });
      console.log(fieldError);
      if (fieldError) {
        fields[paramName].setError(fieldError.message);
      } else {
        fields[paramName].setError(null);
      }
    }
  } else {
    throw error;
  }
};
