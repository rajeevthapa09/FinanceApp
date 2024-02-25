
import { useNavigate } from "react-router-dom";

export default function Advisor(){

    
    let navigate = useNavigate();
    const goProfile = () => {
        navigate("/viewProfile")
    }
    return(
        <div>
            <p>Hi/Hello</p>
            
            <button onClick={goProfile}>Profile</button>
        </div>
    )
}