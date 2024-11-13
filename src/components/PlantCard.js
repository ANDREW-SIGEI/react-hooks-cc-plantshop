import React, { useState } from "react";

function PlantCard({ id, name, price, imageUrl, onDelete, onUpdatePrice }) {
  const [inStock, setInStock] = useState(true);
  const [newPrice, setNewPrice] = useState(price);

  const handleStockToggle = () => {
    setInStock(!inStock);
  };

  const handlePriceUpdate = () => {
    if (newPrice !== price) {
      // Update the plant's price on the backend
      fetch(`http://localhost:6001/plants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: newPrice }),
      })
        .then((response) => response.json())
        .then((updatedPlant) => {
          onUpdatePrice(updatedPlant); // Update the plant list state in the parent component
        });
    }
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDelete(id); // Remove the plant from the state in the parent component
    });
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={imageUrl} alt={name} />
      <h4>{name}</h4>
      <p>
        Price: $
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          step="0.01"
        />
      </p>
      <button className="primary" onClick={handlePriceUpdate}>
        Update Price
      </button>
      {inStock ? (
        <button className="primary" onClick={handleStockToggle}>
          In Stock
        </button>
      ) : (
        <button onClick={handleStockToggle}>Sold out</button>
      )}
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
