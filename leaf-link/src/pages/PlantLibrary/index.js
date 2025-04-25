import { PlantTile } from "../../components/PlantTile";
import { NewPlant } from "../../components/NewPlant";
import plantImage from "../../assets/plantImage.jpg";
import rubberTreePlant from '../../assets/RubberTreePlant.webp';
import { logout } from "../../utilities/logout";
import { checkAuthAndFetch } from "../../utilities/checkAuthAndFetch";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase"; // Adjust the import path as necessary

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


const getUserData = async () => {
    try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if(userSnap.exists()){
            return userSnap.data();
        }
        else{
            console.error("User snap not found");
        }
    } catch (err) {
        console.error("error getting user data: ",err);
    }
};

console.log("auth current user ", auth.currentUser)

export const PlantLibrary = () => {
    useEffect(() => {
        checkAuthAndFetch(getUserData);
        const checkIfPlantsExist = async () => {
            try {
                const userId = auth.currentUser.uid;
                // Reference the "plants" subcollection for the given user
                const plantsRef = collection(db, "users", userId, "plants");
                const plantsSnapshot = await getDocs(plantsRef);
        
                // Check if the subcollection contains any documents
                if (!plantsSnapshot.empty) {
                    console.log("Plants collection exists: ",plantsSnapshot);
                    const plantData = plantsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setPlants(plantData);
                    return true;
                } else {
                    console.log("Plants collection does not exist or is empty.");
                    return false;
                }
            } catch (error) {
                console.error("Error checking plants collection:", error);
                return false;
            }
        };
        checkIfPlantsExist();
    }, []);
    
    const [plants,setPlants]= useState(null);

    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-bold">Your Plants</h1>
                <Link to="/login">
                    <button className="btn-primary" onClick={logout}>Logout</button>
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center w-max mx-auto m-5">
                {plants && plants.length > 0 ? 
                plants.map((plant) => (
                    <PlantTile
                        key={plant.id}
                        name={plant.name}
                        species={plant.species}
                        condition={plant.condition}
                        image={plant.image}
                        lastUpdated={plant.lastUpdated}
                    />
                )):null
                }
                <NewPlant />
            </div>
        </>
    );
};