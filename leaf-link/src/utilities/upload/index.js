import {auth, setDoc, getDocs, collection, doc} from "firebase/firestore"
export const upload = async (plantName, species, condition, image) => {
    try{
        const plantsRef = collection(db, "users", "plants");
        if (!plantsRef.empty) {
            const newPlantRef = await addDoc(plantsRef, {
                plantName,
                species,
                condition,
                image,
            });
        }
    }catch(err){
        console.error("Error adding plant:", err);
    }
    
}