import { useNavigate } from "react-router-dom";

export const PlantTile = ({ name, image, lastUploaded}) => {
    const navigate = useNavigate();
    const date = new Date(lastUploaded);
    const formattedDate = date.toDateString();

    const handleClick = () => {
        //navigate(`/plants/${userId}/${plant.id}`);
    };

    return (
        <div className='w-36 rounded hover:shadow-md h-52 cursor-pointer' onClick={handleClick}>
            <div className="flex h-36 justify-between p-2">
                <img
                    className="w-full h-full rounded-md object-cover object-center"
                    src={image}
                    alt="plant"
                />
            </div>
            <div className="p-2">
                <h1 className="font-semibold">{name}</h1>
                <p className="text-xs">last updated: {formattedDate}</p>
            </div>
        </div>
    );
};