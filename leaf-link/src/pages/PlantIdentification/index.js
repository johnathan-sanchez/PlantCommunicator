import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { PlantUpload } from "../../components/PlantUpload";
import { uploadImageAndGetURL } from "../../utilities/uploadImageAndGetURL";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";
import { doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const PlantIdentification = () => {
    const [species,setSpecies] = useState("");
    const [photoUploadEvent,setPhotoUploadEvent] = useState(true);
    const [plantName,setPlantName] = useState("");
    //hold image instead of URL
    const [plantImage,setPlantImage] = useState(null);
    const [plantImageUrl,setPlantImageUrl] = useState("");
    const [confidenceLevel,setConfidenceLevel] = useState(0);
    const navigate = useNavigate();

    const uploadToDB = async () => {
        try{
            const userRef = doc(db, "users", auth.currentUser.uid);
            const plantsRef = collection(userRef, "plants");
            const url = await uploadImageAndGetURL(plantImage);
            const newPlantRef = {
                name: plantName,
                species: species,
                condition: null,
                image: url,
                lastUploaded: new Date().toLocaleString() // Add a timestamp for when the plant was uploaded
            };
            const docRef = await setDoc(doc(plantsRef), newPlantRef);
        }catch(err){
            console.error(err);
        }
        
    }

    const uploadImage = (file) => {
        var objectURL = URL.createObjectURL(file);
        setPlantImage(file);
        setPlantImageUrl(objectURL);
        console.log("plantImageUrl: ",plantImageUrl);
        predictSpecies(objectURL);
        setPhotoUploadEvent(prev => !prev);
        console.log("plantUploadEvent: ",photoUploadEvent);
    }

    const predictSpecies = async (objectURL)=>{
        try{
            if(!objectURL){
                console.log("No image uploaded");
                return;
            }
            const client = await Client.connect("imageomics/bioclip-demo");
            const response = await fetch(objectURL);
            const imageBlob = await response.blob();
            const result = await client.predict("/lambda", { 
                img: imageBlob,  // Send the image blob
                rank: "Species",  // The prediction rank
        });
        const speciesScientificName = result.data[0]?.confidences?.[0]?.label || "Unknown";
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
    
    useEffect(() => {
        try{
            if (!auth.currentUser) {
            // Redirect to login page if user is not authenticated
                window.location.href = "/login";
            }
        }catch (error) {
            console.error("Error checking authentication:", error);
            // Handle error (e.g., show a message to the user)
        }

    }, []);

    return (
        <>
            {photoUploadEvent ? 

            <PlantUpload upload={uploadImage}/> :

            <div className="text-center">
                <div className="font-bold">Result</div>
                <div className="font-bold">Your plant's species name is <br/><span className="text-green-700 text-xl">{species}</span> </div>
                <div className="w-72 h-72 justify-self-center relative">
                    <img src={plantImageUrl} alt="Plant" className="h-full w-full rounded-3xl justify-self-center"/>
                    <button onClick={()=>{
                        setSpecies("");
                        setConfidenceLevel(0);
                        setPlantImageUrl(null);
                        }} 
                        className="absolute rounded-full bottom-3 right-3 btn-primary !bg-gray-500 !px-3">
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button>                        </div>
                <div className="font-bold">Confidence Level: {confidenceLevel}%</div>
                <input type="text" className="text-input" onChange={(e)=>setPlantName(e.target.value)}/>
                <button 
                    onClick={()=>{
                            // Add the plant to the user's library
                            uploadToDB();
                            navigate("/")
                        } 
                    }    
                    className="cursor-pointer flex items-center justify-center border rounded-lg btn-primary justify-self-center">
                    Add to Library
                </button>
            </div>
            
            
            }
        </>
    )
};