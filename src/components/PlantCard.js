import React, { useState } from "react";

function PlantCard({ plant, updatePrice, deletePlant }) {
  const [newPrice, setNewPrice] = useState(plant.price);

  // Handle the price input change
  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  // Handle price update
  const handleUpdatePrice = () => {
    updatePrice(plant.id, parseFloat(newPrice));
  };

  // Handle delete
  const handleDelete = () => {
    deletePlant(plant.id);
  };

  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>{plant.price} USD</p>

      {/* Update Price */}
      <input
        type="number"
        value={newPrice}
        onChange={handlePriceChange}
        step="0.01"
      />
      <button onClick={handleUpdatePrice}>Update Price</button>

      {/* Delete Plant */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default PlantCard;
