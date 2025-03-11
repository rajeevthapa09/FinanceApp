
import { useContext, useEffect, useState } from "react"
import {getAdvisorInfo} from "./network"
import AdvisorDetails from "./AdvisorDetails";
import GlobalContext from "./GlobalContext";
import { useNavigate } from "react-router-dom";

export default function AdvisorList(){
    const [advisor, setAdvisor] = useState([]);
    const{state, setState} = useContext(GlobalContext)

    let navigate = useNavigate();
    const advisorDetail = async() => {
        // console.log("advisor list: ", state);
        const ret = await getAdvisorInfo(state.userId);
        // console.log("advisor", ret);
        setAdvisor(ret.data);
    }

    useEffect(() => {
        advisorDetail();
    },[])

    const goBack = () =>{
        navigate("/")
    }

    return(
        <div>
            <button onClick={goBack}>Back</button>
            {advisor.map((person) => <AdvisorDetails advise={person} />)}
        </div>
    )
}