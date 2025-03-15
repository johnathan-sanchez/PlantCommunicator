import rubberTreePlant from '../../assets/RubberTreePlant.webp';

export const PlantTile = () => {
    return (
        <div className='w-36 rounded hover:shadow-md h-52 cursor-pointer'>
            <img className="w-full h-auto rounded-md" src={rubberTreePlant} alt="plant"/>
            <div className="p-2">
                <h1 className="font-semibold ">plant name</h1>
                <p className="text-xs"> updated today </p>
            </div>
            
        </div>
    )
};