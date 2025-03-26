import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { PlantUpload } from "../../components/PlantUpload";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";



const confidenceLevel = 90.8;




export const PlantIdentification = () => {
    const [species,setSpecies] = useState("");
    const [photoUploadEvent,setPhotoUploadEvent] = useState(true);
    const [plantName,setPlantName] = useState("");
    const [plantImageUrl,setPlantImageUrl] = useState("");
    const [confidenceLevel,setConfidenceLevel] = useState(0);
    useEffect(()=>{ 
        const predictSpecies = async ()=>{
            try{
                if(!plantImageUrl){
                    console.log("No image uploaded");
                    return;
                }
                const client = await Client.connect("imageomics/bioclip-demo");
                const response = await fetch(plantImageUrl);
                const imageBlob = await response.blob();
                const result = await client.predict("/lambda", { 
                    img: imageBlob,  // Send the image blob
                    rank: "Species",  // The prediction rank
            });
            const speciesScientificName = result.data[0]?.confidences?.[0]?.label || "Unknown";
            //const speciesScientificName = speciesLabel.split(" ").slice(-2).join(" ");
            setSpecies(speciesScientificName);
            var confidence = result.data[0]?.confidences?.[0]?.confidence || 0;
            confidence = confidence.toFixed(2);
            setConfidenceLevel(confidence*100);
            console.log(result.data[0]?.confidences?.[0]);
            console.log("species: ",species,"confidence: ",confidenceLevel);
            }
            catch(err){
                console.log(err);
            }
        
            
        }
        predictSpecies();
        setPhotoUploadEvent(prev => !prev);
        console.log("plantUploadEvent: ",photoUploadEvent);
    },[plantImageUrl]);
    

    return (
        <>
            {photoUploadEvent ? 

            (<PlantUpload upload={setPlantImageUrl}/>) :

            (<div className="text-center">
                <div className="font-bold">Result</div>
                <div className="font-bold">Your plant's species name is <br/><span className="text-green-700 text-xl">{species}</span> </div>
                <div className="w-72 h-72 justify-self-center relative">
                    <img src={plantImageUrl} alt="Plant" className="h-full w-full rounded-3xl justify-self-center"/>
                    <button onClick={()=>{
                        setPlantImageUrl(null);
                        setSpecies("");
                        setConfidenceLevel(0);
                        }} 
                        className="absolute rounded-full bottom-3 right-3 btn-primary !bg-gray-500 !px-3">
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button>                        </div>
                <div className="font-bold">Confidence Level: {confidenceLevel}%</div>
                <input type="text" className="border rounded-lg px-4 py-2 w-72 mb-2 focus:border-green-500 focus:ring-2 focus:ring-green-300 outline-none justify-self-center" placeholder="Enter plant name" onChange={(e)=>setPlantName(e.target.value)}/>
                <Link to="/">
                    <button 
                    className="cursor-pointer flex items-center justify-center border rounded-lg btn-primary justify-self-center">
                        Add to Library
                    </button>
                </Link>
            </div>)
            
            
            }
        </>
    )
};