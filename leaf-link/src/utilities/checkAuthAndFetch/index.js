import { auth } from "../../firebase";
export const checkAuthAndFetch = async (getUserData) => {
    try{
        if (!auth.currentUser) {
        // Redirect to login page if user is not authenticated
            window.location.href = "/login";
        }
        else{
            await getUserData();
        }
    }catch (error) {
        console.error("Error checking authentication:", error);
        // Handle error (e.g., show a message to the user)
    }
}