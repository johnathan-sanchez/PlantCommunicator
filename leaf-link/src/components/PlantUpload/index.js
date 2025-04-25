import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect,useRef, useState  } from "react";

export const PlantUpload = ({upload}) => {
    const dropzoneRef = useRef(null);
    const [plantImageUrl,setPlantImageUrl] = useState(null);
    

    const handleUpload = (e) => {
        console.log("handle upload e.target.file[0]: ",e.target.files[0]);
        setPlantImageUrl(URL.createObjectURL(e.target.files[0]));
        console.log(plantImageUrl);        
    };

    // useEffect(() => {
    //     const dropzone = dropzoneRef.current;

    //     if (!dropzone){
    //         console.error("Dropzone ref not found");
    //         return;
    //     }

    //     const handleDragOver = (e) => {
    //         e.preventDefault();
    //         dropzone.classList.add("bg-green-100");
    //     };

    //     const handleDragLeave = () => {
    //         dropzone.classList.remove("bg-green-100");
    //     };

    //     const handleDrop = (e) => {
    //         console.log(e.dataTransfer.files);
    //         e.preventDefault();
    //         dropzone.classList.remove("bg-green-100");
    //         const files = e.dataTransfer.files;
    //     };

    //     dropzone.addEventListener("dragover", handleDragOver);
    //     dropzone.addEventListener("dragleave", handleDragLeave);
    //     dropzone.addEventListener("drop", handleDrop);

    //     return () => {
    //         dropzone.removeEventListener("dragover", handleDragOver);
    //         dropzone.removeEventListener("dragleave", handleDragLeave);
    //         dropzone.removeEventListener("drop", handleDrop);
    //     };
        
    // }, []);
    return (
        <>
        
        <div className="text-center">
            <div className="font-bold mb-2">Upload your plant's photo</div>

            {plantImageUrl? 

            (<>
                <img src={plantImageUrl} className="border border-green-700 rounded-3xl border-4 w-72 h-72 justify-self-center flex flex-col items-center justify-center" />
                <button onClick={()=>{setPlantImageUrl(null)}} className="border border-4 border-green-700 relative rounded-full bottom-6 btn-primary !px-3">
                    <FontAwesomeIcon icon={faRotateRight} />
                </button>

                <button onClick={()=>{upload(plantImageUrl)}} className="cursor-pointer flex items-center justify-center border rounded-lg btn-primary justify-self-center">Identify</button>
            </>):

            (<div ref={dropzoneRef} className="border rounded-3xl border-dashed border-4 border-green-700 w-72 h-72 justify-self-center flex flex-col items-center justify-center">   
                    <FontAwesomeIcon className="text-green-700 text-6xl" icon={faCloudArrowUp} />
                    <div>Drag Photo to Upload <br />
                    or
                    </div>
                    <label className="cursor-pointer flex items-center justify-center border rounded-lg btn-primary">
                        Upload Photo
                        <input onChange={handleUpload} type="file" className="hidden" />
                    </label>
                    
                </div>)}
            
        </div>
        </>
    )
};