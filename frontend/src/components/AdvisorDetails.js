import { useContext, useState } from "react"
import { setReservation } from "./network"
import GlobalContext from "./GlobalContext";

export default function AdvisorDetails({advise}){
    const [text, setText] = useState(false);
    const {state, setState} = useContext(GlobalContext)

    const sendReq = async() => {
        setText(true);
        console.log("state is: ", state)
        console.log("userid", state.userId, "advisorID", advise._id);
        const res = await setReservation(state.userId, advise._id);
        console.log("reservation", res.data);
    }

    return(
        <div>
            <img src={`http://localhost:5001/images/${advise.profileImg}`} height="100" width="100" alt="advisor pic" /><br />
            Name: {advise.name} <br />
            Email: {advise.email}<br />
            Address: {advise.address}<br />
            
            {advise.requests === "approved" ? (<span style={{color:"blue"}}>Requests Approved<button>Pay</button></span>) :
              (advise.requests === "pending") ? (<button disabled>Request Pending</button>) : <button onClick={sendReq} disabled={text}> {text ? "Request Sent" : "Send Requests"}</button>}
            <br /><br />
        </div>
    )
}