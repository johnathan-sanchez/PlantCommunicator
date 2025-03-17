import rubberPlant from "../../assets/RubberTreePlant.webp";
import { useEffect,useState } from "react";
import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";
const client = await Client.connect("imageomics/bioclip-demo");
const response = await fetch(rubberPlant);
const imageBlob = await response.blob();
const result = await client.predict("/lambda", { 
    img: imageBlob,  // Send the image blob
    rank: "Species",  // The prediction rank
});

// Log the result
console.log(result.data);

const species = "Tulsi";
const confidenceLevel = 90.8;



export const PlantIdentification = () => {
    const [plantName,setPlantName] = useState("");

    return (
        <div className="text-center">
            <div className="font-bold">Result</div>
            <div className="font-bold">Your plant's species name is {species}</div>
            <div className="w-72 h-72 justify-self-center items-center">
                <img src={rubberPlant} alt="Plant" className="w-auto h-auto rounded-3xl"/>
            </div>
            <div className="font-bold">Confidence Level: {confidenceLevel}%</div>
            <input type="text" className="border rounded-lg px-4 py-2 w-72 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none justify-self-center" placeholder="Enter plant name" onChange={(e)=>setPlantName(e.target.value)}/>
            <div>name: {plantName}</div>
            <button className="cursor-pointer flex items-center justify-center border rounded-lg px-4 py-2 bg-green-600 text-white hover:bg-green-700 justify-self-center">Finish</button>
            
        </div>
    )
};