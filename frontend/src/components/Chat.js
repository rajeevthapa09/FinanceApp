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
        if (location.state.role === "regular") {
            console.log("ai am reggular")
            const ret = await sentMsg(state.userId, location.state.id, message);
            console.log("message", ret);
            setMessage("");
        } else {
            console.log("i am advisor")
            const ret = await sentMsg(location.state.id, state.userId, message);
            console.log("message", ret);
            setMessage("");
        }
    };

    const getMsg = async () => {
        if (location.state.role === "regular") {
            const ret = await getMessages(state.userId, location.state.id);
            console.log("messages are:", ret.data);
            setChatMsg(ret.data);
        } else {
            console.log("lcoation", location.state.id, "userid", state.userId)
            const ret = await getMessages(location.state.id, state.userId);
            console.log("messages are:", ret.data);
            setChatMsg(ret.data);
        }
    };

    useEffect(() => {
        getMsg();
    }, []);

    return (
        <div>
            <h3>Chat</h3>
            Sender: <input value={state.userName} disabled />
            Receiver: <input value={location.state.name} disabled />
            Message:<input value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send Message</button>
            {chatMsg.map((chat) => <ChatDisplay msg={chat} sender={state.userName} receiver={location.state.name} />)}
        </div>
    );
}
