import { PlantTile } from "../../components/PlantTile";
import { NewPlant } from "../../components/NewPlant";
import { Link } from "react-router-dom";

export const PlantLibrary = () => {
    return (
        <>
            <h1 className="font-bold">Your Plants</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center w-max mx-auto m-5">
                <PlantTile/>
                <PlantTile/>
                <PlantTile/>
                <NewPlant/> 
            </div>
            

        
        </>
    )
};