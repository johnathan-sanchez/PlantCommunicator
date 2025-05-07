import { useLocation } from 'react-router-dom';

export const PlantProfile = () => {
    const { state } = useLocation();
    const plant = state?.plant;
    const date = new Date(plant.lastUploaded);
    const formattedDate = date.toDateString();

    if (!plant) {
        return <div>Plant not found</div>;
    }

    return (
        <div className="plant-profile">
            <h1 className="font-bold">{plant.name}</h1>
            <img src={plant.image} alt={plant.name} />
            <p>Species: {plant.species}</p>
            <p>Condition: {plant.condition}</p>
            <p>Last Updated: {formattedDate}</p>
        </div>
    );
};
