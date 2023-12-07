import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { signup } from "./network";

//Enum for user roles
const UserRole = {
    ADVISOR: 'advisor',
    REGULAR: 'regular',
};

export default function Signup(){
    let navigate = useNavigate();
    const [user, setUser] = useState({fname: "", address: "", occupation: "", role: "", email: "", password:""});
    const change = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const loginHandle = async(e) => {
        if(e.target.value === "login"){
            navigate("/")
        }
        try{
            const res = await signup({"name": user.fname, "address": user.address, "occupation": user.occupation, "role": user.role, "email": user.email, "password": user.password});
            if(res){
                if(res.success) {
                    navigate("/")
                }else{
                    alert(res.error);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <label>Name : </label><input type="text" value={user.fname} onChange={change} name="fname" />
            <label>Address : </label><input type="text" value={user.address} onChange={change} name="address" />
            <label>Occupation : </label><input type="text" value={user.occupation} onChange={change} name="occupation" />
            <label>Role : </label>
            <select value={user.role} onChange={change} name="role">
                <option value={UserRole.ADVISOR}>Advisor</option>
                <option value={UserRole.REGULAR}>Regular</option>
            </select>
            
            <input type="text" value={user.role} onChange={change} name="role" />
            <label>Email : </label><input type="text" value={user.email} onChange={change} name="email" />
            <label>Password : </label><input type="password" value={user.password} onChange={change} name="password" />
            <button onClick={loginHandle} value="login">Back to Login</button><button onClick={loginHandle} value="signup">Signup</button>
        </div>
    )
}