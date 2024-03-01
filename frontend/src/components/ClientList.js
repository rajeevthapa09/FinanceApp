import { useContext, useState } from "react"
import { setReservation } from "./network"
import GlobalContext from "./GlobalContext";
import { rejectClient, acceptClient } from "./network";

export default function ClientList({clientUsr}){
    const [text, setText] = useState(false);
    const {state, setState} = useContext(GlobalContext)

    const declineReq = async() => {
        console.log("adv id", state.userID)
        const res = await rejectClient(clientUsr.id, state.userId);
        console.log("res decline", res)
    }

    const acceptReq = async() => {
        const res = await acceptClient(clientUsr.id, state.userId);
        console.log("res accept", res)
    }
   
    return(
        <div>
            <img src={`http://localhost:5001/images/${clientUsr.profileImg}`} height="100" width="100" alt="advisor pic" /><br />
            Name: {clientUsr.name} <br />
            Email: {clientUsr.occupation}<br />
            Address: {clientUsr.address}<br />
            <button>Show Details</button>
            <button onClick={acceptReq}>Accept</button><button onClick={declineReq}>Decline</button>
            <br /><br />
        </div>
    )
}