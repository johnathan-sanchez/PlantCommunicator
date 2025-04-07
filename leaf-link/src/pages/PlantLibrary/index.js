import { PlantTile } from "../../components/PlantTile";
import { NewPlant } from "../../components/NewPlant";
import plantImage from "../../assets/plantImage.jpg";
import rubberTreePlant from '../../assets/RubberTreePlant.webp';
import { logout } from "../../utilities/logout";
import { Link } from "react-router-dom";

export const applicationData = {
    users: [
        {
            id: 1,
            name: "John Doe",
            email: "johnnyboi@gmail.com",
            plants: [
                {
                    id: 1,
                    name: "Snake Plant",
                    species: "Sansevieria trifasciata",
                    condition: 10,
                    Image: rubberTreePlant,
                    lastUpdated: "3/26/2025"
                },
                {
                    id: 2,
                    name: "Spider Plant",
                    species: "Chlorophytum comosum",
                    condition: 5,
                    Image: plantImage,
                    lastUpdated: "3/26/2025"
                },
                {
                    id: 3,
                    name: "Aloe Vera",
                    species: "Aloe barbadensis miller",
                    condition: 3,
                    Image: plantImage,
                    lastUpdated: "3/26/2025"
                },
                {
                    id: 4,
                    name: "Rubber Plant",
                    species: "Ficus elastica",
                    condition: 8,
                    Image: plantImage,
                    lastUpdated: "3/26/2025"
                },
                {
                    id: 5,
                    name: "Peace Lily",
                    species: "Spathiphyllum",
                    condition: 7,
                    Image: plantImage,
                    lastUpdated: "3/26/2025"
                }
            ]
        },
        {
            id: 2,
            name: "Jane Doe",
            email: "jennidabaddie@yahoo.com",
            plants: [
                {
                    id: 1,
                    name: "Rubber Plant",
                    species: "Ficus elastica",
                    condition: 8,
                    Image: plantImage,
                    lastUpdated: "3/26/2025"
                },
                {
                    id: 2,
                    name: "Peace Lily",
                    species: "Spathiphyllum",
                    condition: 7,
                    Image: plantImage,
                    lastUpdated: "3/26/2025"
                }
            ]
        }
    ]
};

export const PlantLibrary = () => {
    const userId = 2; // Simulate user with id: 1
    const user = applicationData.users.find(user => user.id === userId);

    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-bold">Your Plants</h1>
                <Link to="/login">
                    <button className="btn-primary" onClick={logout}>Logout</button>
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center w-max mx-auto m-5">
                {(() => {
                    try {
                        return (
                            <>
                                {user.plants.map(plant => (
                                    <PlantTile userId={userId} key={plant.id} plant={plant} />
                                ))}
                                <NewPlant />
                            </>
                        );
                    } catch (error) {
                        console.error("Error rendering plants:", error);
                        return <p>Error loading plants.</p>;
                    }
                })()}
            </div>
        </>
    );
};