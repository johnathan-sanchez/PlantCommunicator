import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../../firebase"; // Adjust the import path as necessary

export const uploadImageAndGetURL = async (file) => {
  try{
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }catch(err){
    console.error("Error uploading image: ", err);
    return null;
  }
  
};
