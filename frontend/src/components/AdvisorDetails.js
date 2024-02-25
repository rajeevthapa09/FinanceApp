import { useState } from "react"


export default function AdvisorDetails({advise}){
    const [text, setText] = useState(false);

    const sendReq = () => {
        setText(true);
    }

    console.log("advise", advise)
    return(
        <div>
            <img src={`http://localhost:5001/images/${advise.profileImg}`} height="100" width="100" alt="advisor pic" /><br />
            Name: {advise.name} <br />
            Email: {advise.email}<br />
            Address: {advise.address}<br />
            <button onClick={sendReq}> {text ? "Request Sent" : "Send Requests"}</button>
            <br /><br />
        </div>
    )
}