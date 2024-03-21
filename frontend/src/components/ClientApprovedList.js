import { useNavigate } from "react-router-dom";

export default function ClientApprovedList({ appClient }) {
    let navigate = useNavigate();
    const chatAdv = () => {
        navigate("/chat", { state: { id: appClient.id, name: appClient.name, role: "advisor" } });
    }
    return (
        <div>
            <img src={`http://localhost:5001/images/${appClient.profileImg}`} height="100" width="100" alt="client pic" /><br />
            Name: {appClient.name} <br />
            Email: {appClient.email}<br />
            Address: {appClient.address}<br />
            <button onClick={chatAdv}>Chat</button>
            <br /><br />
        </div>
    )
}