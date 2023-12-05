import { useNavigate } from "react-router-dom"


export default function Signup(){
    let navigate = useNavigate();

    const loginHandle = (e) => {
        if(e.target.value === "login"){
            navigate("/")
        }
    }

    return(
        <div>
            <label>Name : </label><input type="text" value="" />
            <label>Address : </label><input type="text" value="" />
            <label>DOB : </label><input type="text" value="" />
            <label>Occupation : </label><input type="text" value="" />
            <label>Role : </label><input type="text" value="" />
            <label>Email : </label><input type="text" value="" />
            <label>Password : </label><input type="text" value="" />
            <button onClick={loginHandle} value="login">Back to Login</button><button onClick={loginHandle} value="signup">Signup</button>
        </div>
    )
}