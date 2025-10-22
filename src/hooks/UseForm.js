import { useState, useEffect } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    handleChange,
    setValues,
    resetForm,
  };
}
