import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { applicationData } from "../PlantLibrary"; // Adjust the import path as needed

export const PlantProfile = () => {
    const { userId, plantId } = useParams();
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        const user = applicationData.users.find(user => user.id === parseInt(userId));
        if (user) {
            const plant = user.plants.find(plant => plant.id === parseInt(plantId));
            setPlant(plant);
        }
    }, [userId, plantId]);

    if (!plant) {
        return <div>Plant not found</div>;
    }

    return (
        <div className="plant-profile">
            <h1 className="font-bold" >{plant.name}</h1>
            <img src={plant.Image} alt={plant.name} />
            <p>Species: {plant.species}</p>
            <p>Condition: {plant.condition}</p>
            <p>Last Updated: {plant.lastUpdated}</p>
        </div>
    );
};