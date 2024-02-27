
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import {getClientInfo} from "./network"

export default function Advisor(){

    const {state, setState} = useContext(GlobalContext);
    
    let navigate = useNavigate();
    const goProfile = () => {
        navigate("/viewProfile")
    }

    const checkReq = async() => {
        console.log("advisor list: ", state);
        const ret = await getClientInfo(state.userId);
        console.log("advisor", ret);
        
    }

    useEffect(() => {
        checkReq();
    },[])

    return(
        <div>
            <p>Hi/Hello</p>
            
            <button onClick={goProfile}>Profile</button>
        </div>
    )
}