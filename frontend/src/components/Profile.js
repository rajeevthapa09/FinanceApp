import { useEffect } from "react"
import { getUserInfo } from "./network"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile(){
    const [userInfo, setUserInfo] = useState({name:"", address:"", occupation: "", email:"", profileImg:"", role:""});
    let navigate = useNavigate();

    const userDetails = async() => {
        const ret = await getUserInfo();
        console.log("profile", ret);
        setUserInfo(ret.data);
    }

    useEffect(() => {
        userDetails();
    },[])

    const goBack = () =>{
        navigate("/")
    }

    return(
        <div>
            <button onClick={goBack}>Back</button>
            <img src="public/image/profileImg-1708679465209.png" alt="profile pic" /><br />
            <label>Name:</label><input type="text" value={userInfo.name} /><br />
            <label>Address:</label><input type="text" value={userInfo.address} /><br />
            <label>Occupation: </label><input type="text" value={userInfo.occupation} /><br />
            <label>Role: </label><input type="text" value={userInfo.role} /><br />
            <label>Email: </label><input type="text" value={userInfo.email} /><br />
            <label>Profile Pic: </label><input type="text" value={userInfo.profileImg} />
        </div>
    )
}