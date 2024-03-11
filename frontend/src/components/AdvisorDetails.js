import { useContext, useState } from "react"
import { setReservation } from "./network"
import GlobalContext from "./GlobalContext";
import Payment from "./Payment";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";

export default function AdvisorDetails({advise}){
    const [text, setText] = useState(false);
    const {state, setState} = useContext(GlobalContext)
    const [displayCC, setDisplayCC] = useState(false);
    const [chat, showChat] = useState(false)
    let navigate = useNavigate();

    const sendReq = async() => {
        setText(true);
        console.log("state is: ", state)
        console.log("userid", state.userId, "advisorID", advise._id);
        const res = await setReservation(state.userId, advise._id);
        console.log("reservation", res.data);
    }

    const payAdvisor = () => {
        setDisplayCC(true);
    }

    const chatAdv = () => {
       navigate("/chat",  {state: {advisorId: advise._id, advisorName:advise.name}});
    }

    return(
        <div>
            <img src={`http://localhost:5001/images/${advise.profileImg}`} height="100" width="100" alt="advisor pic" /><br />
            Name: {advise.name} <br />
            Email: {advise.email}<br />
            Address: {advise.address}<br />
            
            {advise.requests === "approved" ? (<span style={{color:"blue"}}>Requests Approved<button onClick={payAdvisor}>Pay</button></span>) :
              (advise.requests === "pending") ? (<button disabled>Request Pending</button>) : <button onClick={sendReq} disabled={text}> {text ? "Request Sent" : "Send Requests"}</button>}
            {displayCC? <Payment display={setDisplayCC} chat={showChat} /> : ""} 

            <button onClick={chatAdv}>Chat</button>
            <br /><br />
        </div>
    )
}