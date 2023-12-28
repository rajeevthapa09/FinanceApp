
import { useEffect, useState } from "react"
import {getAdvisorInfo} from "./network"
import AdvisorDetails from "./AdvisorDetails";

export default function AdvisorList(){
    const [advisor, setAdvisor] = useState([]);

    const advisorDetails = async() => {
        const ret = await getAdvisorInfo();
        console.log("advisor", ret);
        setAdvisor(ret.data);
    }

    useEffect(() => {
        advisorDetails();
    },[])

    return(
        <div>
            {advisor.map((person) => <AdvisorDetails advise={person} />)}
        </div>
    )

}