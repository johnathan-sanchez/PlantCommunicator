import { auth } from "../../firebase"; // Adjust the import path as necessary
import { signOut } from "firebase/auth"; // Import signOut from firebase/auth


export const logout = async () => {
    try {
        await signOut(auth);
        console.log("User logged out");
        //takes the user to the home page after logout
    } catch (error) {
        console.error("Error signing out:", error);
        // Handle error (e.g., show a message to the user)
    }
}