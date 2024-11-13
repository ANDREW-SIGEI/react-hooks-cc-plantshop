import React, { useState } from "react";

function NewPlantForm({ addPlant }) {
  // State to track input values
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to add the new plant
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        image: formData.image,
        price: parseFloat(formData.price),
      }),
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // Call the addPlant function passed from the parent to update the plant list
        addPlant(data);
        // Reset form data
        setFormData({
          name: "",
          image: "",
          price: "",
        });
      })
      .catch((error) => {
        console.error("Error adding plant:", error);
      });
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Plant name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          placeholder="Image URL"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          step="0.01"
          placeholder="Price"
          onChange={handleInputChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
