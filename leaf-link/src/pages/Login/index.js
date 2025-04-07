import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { logout } from "../../utilities/logout"; // Adjust the import path as necessary
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, auth, signInWithPopup, googleProvider, signOut} from "../../firebase";

export const Login = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    auth.currentUser?
    console.log("auth.currentUser email: ", auth.currentUser.email):
    console.log("auth.currentUser is null");

    
    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            await signInWithEmailAndPassword(auth, email, e.target.password.value);
            console.log("User logged in:", email);
            navigate("/");
            //takes the user to the home page after login
        } catch (error) {
            console.error("Error signing in:", error);
            // Handle error (e.g., show a message to the user)
        }
    };

    const handleSignUp = async (e) => {
        try {
            e.preventDefault();
            await createUserWithEmailAndPassword(auth, email, e.target.password.value);
            console.log("User signed up:", email);
            //takes the user to the home page after signup
            navigate("/");

        } catch (error) {
            console.error("Error signing up:", error);
            // Handle error (e.g., show a message to the user)
        }
    }
    const handleLoginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("User logged in with Google:", auth.currentUser.email);
            //takes the user to the home page after login
            navigate("/");
        } catch (error) {
            console.error("Error signing in with Google:", error);
            // Handle error (e.g., show a message to the user)
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <form onSubmit={handleSignUp}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={handleLoginWithGoogle}>Login with Google</button>
            <button onClick={logout}>Logout</button>
        </>
    );
}