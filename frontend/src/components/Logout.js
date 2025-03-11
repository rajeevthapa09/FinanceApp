import { useContext } from "react";
import GlobalContext from "./GlobalContext";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const {state, setState} = useContext(GlobalContext);
     let navigate = useNavigate();
    console.log("test")
    const logout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("userEmail", "");
        localStorage.setItem("userId", "");
        setState({...state, token: null, user: "", role: true});
        navigate("/")
    }
    return(
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}