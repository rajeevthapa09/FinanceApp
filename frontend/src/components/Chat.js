import { useContext, useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import { useLocation } from "react-router-dom";
import { sentMsg, getMessages } from "./network";
import ChatDisplay from "./ChatDisplay";

export default function Chat() {
    const [message, setMessage] = useState("");
    const location = useLocation();
    const [chatMsg, setChatMsg] = useState([]);
    const { state, setState } = useContext(GlobalContext);

    const sendMessage = async () => {
        const ret = await sentMsg(state.userId, location.state.advisorId, message);
        console.log("message", ret);
        setMessage("");
    };

    const getMsg = async () => {
        const ret = await getMessages(state.userId, location.state.advisorId);
        console.log("messages are:", ret);
        setChatMsg(ret);
    };

    useEffect(() => {
        getMsg();
    }, []);

    return (
        <div>
            <h3>Chat</h3>
            Sender: <input value={state.userName} disabled />
            Receiver: <input value={location.state.advisorName} disabled />
            Message:<input value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send Message</button>
            {true ? (
                chatMsg.map((chat, index) => console.log("111"))
            ) : (
                <p>No messages available</p>
            )}
        </div>
    );
}
