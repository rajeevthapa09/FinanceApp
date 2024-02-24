import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import { login } from "./network";
import myrouter from "./LayoutRegular";
import { RouterProvider } from 'react-router-dom';
import GlobalContext from "./GlobalContext";

export default function Login() {
    let navigate = useNavigate();
    const {state, setState} = useContext(GlobalContext);
    const [user, setUser] = useState({ email: "", password: "" });

    const change = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const loginHandle = async (e) => {
        if (e.target.value === "Signup") {
            navigate("/signup");

        } else {
            try {
                const res = await login(user.email, user.password)
                console.log("res", res)
                if (res.success) {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("userEmail", res.data.email);
                    if(res.data.role === "regular"){
                        setState({...state, user: user.email, token: res.data.token});
                    }else{
                        setState({...state, user: user.email, role: false, token: res.data.token});
                    }
                }
            } catch (error) {

            }
        }
    }

    return (
        <div style={{marginLeft: 100, marginRight:100, textAlign: "center"}}>
            <p style={{fontSize: 50}}>FINT</p>
            <p style={{fontSize: 10}}>Master your Finance</p>
            <label>Email : </label><input type="text" placeholder="Enter Email" value={user.email} onChange={change} name="email" /><br />
            <label>Password : </label><input type="password" placeholder="Enter Password" value={user.password} onChange={change} name="password" /><br />
            <button onClick={loginHandle} value="Login">Login</button>
            <button onClick={loginHandle} value="Signup">Signup</button>
        </div>
    )
}