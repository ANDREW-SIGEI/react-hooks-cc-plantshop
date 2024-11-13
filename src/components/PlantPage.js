import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(plants)

  useEffect(() => {
    fetch("http://localhost:3000/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleUpdatePrice = (updatedPlant) => {
    setPlants(plants.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
    ));
  };

  const handleDelete = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList
        plants={filteredPlants}
        onDelete={handleDelete}
        onUpdatePrice={handleUpdatePrice}
      />
    </main>
  );
}

export default PlantPage;
