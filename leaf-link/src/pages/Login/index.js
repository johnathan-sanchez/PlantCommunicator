import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { logout } from "../../utilities/logout"; // Adjust the import path as necessary
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, auth, signInWithPopup, googleProvider, updateProfile, db} from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export const Login = () => {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            await signInWithEmailAndPassword(auth, email, e.target.password.value);
            console.log("User logged in:", auth.currentUser);
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
            await updateProfile(auth.currentUser, {
                displayName: `${firstName} ${lastName}`, // Combine first and last name
            });
            console.log("User signed up:", email);
            const userRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userRef,{
                email:email,
                firstName:firstName,
                lastName:lastName
            })
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
            const [firstName, lastName] = auth.currentUser.displayName.split(" "); 
            const userRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userRef,{
                email:email,
                firstName:firstName,
                lastName:lastName
            })
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
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength="50" required />
                <input type="password" name="password" placeholder="Password" maxLength="50" required />
                <button type="submit">Login</button>
            </form>
            <form onSubmit={handleSignUp}>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength="50" required />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setFirstName(e.target.value)} maxLength="50" required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength="50" required />
                <input type="password" name="password" placeholder="Password" maxLength="50" required />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={handleLoginWithGoogle}>Login with Google</button>
            <button onClick={logout}>Logout</button>
        </>
    );
}