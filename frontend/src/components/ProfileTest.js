import { useContext, useEffect, useState } from "react"
import GlobalContext from "./GlobalContext";
import { getUserInfo } from './getUserInfo';


export default function ProfileTest(){
    const {state, setState} = useContext(GlobalContext)
    const [userInfo, setUserInfo] = useState({});

    const diplayUser = async() => {
        const ret = await getUserInfo(state.user);
        console.log("userInfo", ret.data)
        setUserInfo({...ret.data});

    }

    useEffect(()=>{
        diplayUser();
    }, [])

    return(
        <div>
            <img src={userInfo.profileImg} alt="user pic" /> <br />
            Name: <input value={userInfo.name} /> <br />
            Role: <input value={userInfo.role}/> <br />
            Address: <input value={userInfo.occupation}/> <br />
        </div>
    )
}