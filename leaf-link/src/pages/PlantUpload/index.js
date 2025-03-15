import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

export const PlantUpload = () => {
    return (
        <div className="text-center">
            <div className="font-bold">Upload your plant's photo</div>
            <div className="border rounded-3xl border-dashed border-4 border-green-700 w-72 h-72 justify-self-center items-center">
                <FontAwesomeIcon className="text-green-700 text-6xl" icon={faCloudArrowUp} />
                <div>Drag Photo to Uplaod <br />
                or
                </div>
                <label className="cursor-pointer flex items-center justify-center border rounded-lg px-4 py-2 bg-green-600 text-white hover:bg-green-700">
                    Upload Photo
                    <input type="file" className="hidden" />
                </label>

            </div>
            <button className="cursor-pointer flex items-center justify-center border rounded-lg px-4 py-2 bg-green-600 text-white hover:bg-green-700 justify-self-center">Identify</button>
            
        </div>
    )
};