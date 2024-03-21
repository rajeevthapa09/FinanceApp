
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import {getApprovedClient, getClientInfo} from "./network"
import ClientList from "./ClientList";
import ClientApprovedList from "./ClientApprovedList";

export default function Advisor(){

    const {state, setState} = useContext(GlobalContext);
    const [client, setClient] = useState([]);
    const [approvedClient, setApprovedClient] = useState([])
    
    let navigate = useNavigate();
    const goProfile = () => {
        navigate("/viewProfile")
    }

    const checkReq = async() => {
        // console.log("advisor list: ", state);
        const ret = await getClientInfo(state.userId);
        setClient(ret.data); 
    }

    const checkClient = async() => {
        const ret = await getApprovedClient(state.userId);
        setApprovedClient(ret.data);
        console.log("clientChatlist", ret.data)
    }

    useEffect(() => {
        checkReq();
    },[])
    
    useEffect(() => {
        checkClient();
    },[])

    return(
        <div>    
            <button onClick={goProfile}>Profile</button>
            {client.map((person) => <ClientList clientUsr={person} />)}
            {approvedClient.map((approved) => <ClientApprovedList appClient={approved} />)}
        </div>
    )
}