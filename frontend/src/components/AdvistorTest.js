import { useEffect, useState } from "react";
import { getAdvisorInfo } from "./network";

export default function AdvisorTest(){

    const [advInfo, setAdvInfo] = useState([{}]);

    const showAdvisor = async() => {
        const res = await getAdvisorInfo();
        console.log("advisor", res.data);
        setAdvInfo([...res.data]);
    }
    useEffect(() => {
        showAdvisor();
    },[])

    return(
        <div>
            {advInfo.map((adv) => <AdvisorDetail adv={adv} />)}
        </div>
    )
}

function AdvisorDetail({adv}){

    return(
        <div>
            <img src={adv.profileImg} alt="advisor pic" /> <br />
            Name: {adv.name} <br />
            Email: {adv.email} <br />
        </div>
    )
}