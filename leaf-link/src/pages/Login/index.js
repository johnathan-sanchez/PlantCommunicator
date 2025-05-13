import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, auth, signInWithPopup, googleProvider, updateProfile, db} from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import googleIcon from "../../assets/icons/google-logo-icon.png";
import leafLinkIcon from "../../assets/icons/leaf-link-icon.png";

export const Login = () => {
    const [loginScreen, setLoginScreen] = useState(true);
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
            <img src={leafLinkIcon} alt="Leaf Link Icon" className="w-52 mx-auto mt-2 mb-2" />

            <button className="mx-auto block rounded-full border border-gray-400 m-6" onClick={handleLoginWithGoogle}>
                <img src={googleIcon} alt="Google Icon" className="w-6 h-6 m-4" /></button>

            <h2 className="text-2xl font-bold text-center mb-4 ">{loginScreen ? "Login" : "Sign Up"}</h2>
            {loginScreen ? 
            <form onSubmit={handleLogin} className="flex flex-col items-center">
                <input type="email" placeholder="Email" value={email} className="text-input" onChange={(e) => setEmail(e.target.value)} maxLength="50" required />
                <input type="password" name="password" className="text-input" placeholder="Password" maxLength="50" required />
                <button type="submit" className="btn-primary rounded-lg">Login</button>
            </form> : 
            <form onSubmit={handleSignUp} className="flex flex-col items-center">
                <input type="text" placeholder="First Name" value={firstName} className="text-input" onChange={(e) => setFirstName(e.target.value)} maxLength="50" required />
                <input type="text" placeholder="Last Name" value={lastName} className="text-input" onChange={(e) => setLastName(e.target.value)} maxLength="50" required />
                <input type="email" placeholder="Email" value={email} className="text-input" onChange={(e) => setEmail(e.target.value)} maxLength="50" required />
                <input type="password" name="password" placeholder="Password" className="text-input" maxLength="50" required />
                <button type="submit" className="btn-primary rounded-lg">Sign Up</button>
            </form>}

            <div className="text-center">{loginScreen ? "Dont have an account?" : "Have an account?"} <span onClick={() => setLoginScreen(prev => !prev)} className="font-bold cursor-pointer">{loginScreen ? "Sign Up" : "Login"}</span></div>

            
            
        </>
    );
}