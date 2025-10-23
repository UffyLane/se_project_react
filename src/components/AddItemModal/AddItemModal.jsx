import { useEffect } from "react";
import useForm from "../../hooks/UseForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";




const AddItemModal = ({ isOpen, onSubmit, onClose }) => {
  const defaultValues = { name: "", imageUrl: "", weather: "", };
  const { values, handleChange, resetForm } = useForm(
    defaultValues
  );
 useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);


  const weatherTypes = ["cold", "warm", "hot"];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!values.name || !values.imageUrl || !values.weather) {
      alert("Please fill in all fields.");
      return; 
    }

    const newItem = {
      _id: Date.now().toString(),
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    };
    
    onSubmit(newItem);
  }

  return (
    <ModalWithForm
      title="New garment"
        buttonText="Add garment"
        isOpen={isOpen}
        onClose={onClose}   
        onSubmit={handleFormSubmit}
      >

        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            name="name"
            minLength="2"
            maxLength="200"
            value={values.name}
            onChange={handleChange}
            required
          />
         
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{""}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL" 
            pattern="https?://.+"
            value={values.imageUrl}
            onChange={handleChange}
            required
          />

        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <div className="modal__radio-input-container">
            {weatherTypes.map((label) => {
              const id = `weather-${label.toLowerCase()}`;
              return (
                <label
                  key={id}
                  htmlFor={id}
                  className="modal__label_type_radio"
                >
                  <input
                    type="radio"
                    id={id}
                    name="weather"
                    className="radio modal__radio-input"
                    value={label}
                    onChange={handleChange}
                    checked={values.weather === label}
                    required
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </fieldset>
    </ModalWithForm>
    
  );
  
};

export default AddItemModal;