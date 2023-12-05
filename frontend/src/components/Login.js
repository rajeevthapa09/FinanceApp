import { useNavigate } from "react-router-dom"

export default function Login() {
    let navigate = useNavigate();


    const loginHandle = async(e) => {
        if (e.target.value === "Signup") {
            navigate("/signup")
        } else {
            try {

            } catch (error) {

            }
        }
    }

    return (
        <div>
                <label>Email : </label><input type="text" placeholder="Enter Email" value="" />
                <label>Password : </label><input type="text" placeholder="Enter Password" value="" />
                <button onClick={loginHandle} value="Login">Login</button>
                <button onClick={loginHandle} value="Signup">Signup</button>
        </div>
    )
}