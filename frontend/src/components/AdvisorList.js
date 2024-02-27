
import { useContext, useEffect, useState } from "react"
import {getAdvisorInfo} from "./network"
import AdvisorDetails from "./AdvisorDetails";
import GlobalContext from "./GlobalContext";

export default function AdvisorList(){
    const [advisor, setAdvisor] = useState([]);
    const{state, setState} = useContext(GlobalContext)


    const advisorDetail = async() => {
        console.log("advisor list: ", state);
        const ret = await getAdvisorInfo();
        console.log("advisor", ret);
        setAdvisor(ret.data);
    }

    useEffect(() => {
        advisorDetail();
    },[])

    return(
        <div>
            {advisor.map((person) => <AdvisorDetails advise={person} />)}
        </div>
    )

}