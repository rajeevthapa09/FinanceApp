import { useContext } from "react";
import GlobalContext from "./GlobalContext";

export default function Logout(){
    const {state, setState} = useContext(GlobalContext);
    
    const logout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("userEmail", "");
        setState({...state, token: null, user: "", role: true});
    }
    return(
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}