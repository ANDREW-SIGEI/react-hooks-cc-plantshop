import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDelete, onUpdatePrice }) {

  console.log(plants)

  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          id={plant.id}
          name={plant.name}
          price={plant.price}
          imageUrl={plant.image}
          onDelete={onDelete}
          onUpdatePrice={onUpdatePrice}
        />
      ))}
    </ul>
  );
}

export default PlantList;
