import axios from 'axios'
axios.defaults.baseURL = "http://localhost:5001";
// axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem("token")}`
export const userEmail = localStorage.getItem("userEmail")
// console.log(`Bearer ${localStorage.getItem("token")}`, "useremail", userEmail);
// const token = localStorage.getItem("token");

export async function signup(user){
    const url ="/signup";
    console.log("hherher");
    
    const formData = new FormData();
    for(const key in user){
        formData.append(key, user[key]);
    }
    try{
        const res = await axios.post(url, formData, {headers : {
            'Content-Type': 'multipart/form-data'
        }});
        return res.data;
    }catch (error){
        console.log(error.message);
        return null;
    }
}

export async function login(email, password){
    const url = "/signin";
    try{
        const res = await axios.post(url, {email, password});
        return res.data;
    }catch (error){
        return null;
    }
}

export async function addBudget(budget){
    console.log("budget", budget)
    const url = `/budget/${userEmail}`;
    try{
        console.log("therer")
        const res = await axios.post(url, budget);
        console.log("res is", res)
        return res.data;
    }catch(error){
        return null;
    }
}

export async function getBudget(date, userEmail){
    const url = `/getBudget/${date}/${userEmail}`
    try{
        const res = await axios.get(url)
        return res.data;

    }catch(error){
        return null;
    }
}

export async function getAdvisorInfo(userId){
    const url=`/getAdvisorInfo/client/${userId}`
    console.log("advisor network", userId)
    try{
        const ret = await axios.get(url, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        });
        console.log("advisor Info newtork", ret)
        return ret.data;
    }catch(error){
        return null;
    }
}

export async function getClientInfo(advisorID){
    const url=`/getClientInfo/${advisorID}`
    try{
        const ret = await axios.get(url, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        });
        console.log("client Info newtork", ret)
        return ret.data;
    }catch(error){
        return null;
    }
}

export async function setReservation(userID, advisorID){
    const url=`/reservation/user/${userID}/advisor/${advisorID}`
    const token = localStorage.getItem("token");
    try{
        const ret = await axios.post(url, null,{
            headers:{'Authorization': `Bearer ${token}`}
        });
        return ret.data;
    }catch(error){
        return null;
    }
}

export async function rejectClient(clientID, advisorID){
    const url=`/rejectClient/advisor/${advisorID}/client/${clientID}`
    const token = localStorage.getItem("token");
    try{
        const ret = await axios.put(url, null,{
            headers:{'Authorization': `Bearer ${token}`}
        });
        return ret.data;
    }catch(error){
        return null;
    }
}

export async function acceptClient(clientID, advisorID){
    const url=`/acceptClient/advisor/${advisorID}/client/${clientID}`
    const token = localStorage.getItem("token");
    try{
        const ret = await axios.put(url, null,{
            headers:{'Authorization': `Bearer ${token}`}
        });
        return ret.data;
    }catch(error){
        return null;
    }
}

export async function sentMsg(userID, advisorID, message){
    console.log("message is", message)
    const url=`/message/user/${userID}/advisor/${advisorID}`
    const token = localStorage.getItem("token");
    try{
        const ret = await axios.post(url, {message},{
            headers:{'Authorization': `Bearer ${token}`}
        });
        return ret.data;
    }catch(error){
        return null;
    }
}

export async function getMessages(userID, advisorID){
    const url=`/message/${userID}/advisor/${advisorID}`
    console.log("getMsg userid", userID, "advisorId", advisorID);
    try{
        const ret = await axios.get(url, {
            headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`}
        });
        console.log("netw return msg", ret.data)
        return ret.data;
    }catch(error){
        return null;
    }
}

export async function getStockInfo(stockName){
    axios.defaults.baseURL = "https://api.marketdata.app/v1/stocks/quotes";
    const url = `/${stockName}/?token=Sm5URGF1NTc2Y0ItcWpBSS16c2FvRDh4b3RoZy1aWDI1dXpWZi1zTkxfQT0`;
    try{
        const res = await axios.get(url);
        return res.data;
    }catch(error){
        return null;
    }
}

export async function paymentHandler(obj) {
    // axios.defaults.baseURL = "http://localhost:5001";
    console.log("payment")
    const token = localStorage.getItem("token"); 
    try{
        console.log("network token", token)
        const response = await axios.post("/api/pay", obj,{
            headers:{'Authorization': `Bearer ${token}`}
        });
        return response.data;
    }catch(error){
        return null;
    }
}