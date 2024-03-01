
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import {getClientInfo} from "./network"
import ClientList from "./ClientList";

export default function Advisor(){

    const {state, setState} = useContext(GlobalContext);
    const [client, setClient] = useState([]);
    
    let navigate = useNavigate();
    const goProfile = () => {
        navigate("/viewProfile")
    }

    const checkReq = async() => {
        // console.log("advisor list: ", state);
        const ret = await getClientInfo(state.userId);
        console.log("clientlist", ret.data);
        setClient(ret.data); 
    }

    useEffect(() => {
        checkReq();
    },[])
    console.log("client is", client)

    return(
        <div>    
            <button onClick={goProfile}>Profile</button>
            {client.map((person) => <ClientList clientUsr={person} />)}
        </div>
    )
}