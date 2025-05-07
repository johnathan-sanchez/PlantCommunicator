import rubberTreePlant from '../../assets/RubberTreePlant.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

//button to add new plant
export const NewPlant = () => {
    return (
        <Link to="/plant-identification">
            <div className=' w-36 rounded-lg h-52 flex justify-center items-center'>
                <div className="bg-green-50 hover:bg-green-100 w-20 h-20 rounded-xl flex justify-center items-center hover:shadow-md cursor-pointer">
                    <div className="border-2 border-green-700 w-8 h-8 rounded-full flex justify-center items-center"> 
                        <FontAwesomeIcon className="text-lg text-green-700" icon={faPlus} />
                    </div>
                </div>
            </div>
        </Link>
        
    )
};