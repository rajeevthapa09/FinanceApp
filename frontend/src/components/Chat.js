import { useContext, useState } from "react";
import GlobalContext from "./GlobalContext";
import { useLocation } from "react-router-dom";

export default function Chat(){
    const [message, setMessage] = useState("");
    const location = useLocation();
    const {state, setState} = useContext(GlobalContext)
    const sendMessage = () => {

    }

    return(
        <div>
            <h3>Chat</h3>
            Sender: <input value={state.userName} disabled />
            Receiver: <input value={location.state.advisorName} disabled />
            Message:<input value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send Message</button>
            <div>

            </div>
        </div>
    )
}