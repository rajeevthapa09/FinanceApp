import axios from 'axios'
axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
const userEmail = localStorage.getItem("userEmail")

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

export async function getUserInfo(){
    const url = `/userinfo/${userEmail}`
    try{
        const res = await axios.get(url);
        console.log("network", res);
        return res.data;

    }catch(error){
        return null;
    }
}

export async function getAdvisorInfo(){
    const url="/getAdvisorInfo"
    try{
        const ret = await axios.get(url);
        return ret.data;
    }catch(error){
        return null;
    }

}

export async function getStockInfo1(stockName){
    axios.defaults.baseURL = "https://api.marketdata.app/v1/stocks/quotes";
    const url = `/${stockName}/?token=fsfdsfsdfsdfsdfsdfsdfdsfsdfsf`;
    try{
        const res = await axios.get(url);
        return res.data
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
    axios.defaults.baseURL = "http://localhost:5001";

    try{
        const response = await axios.post("/api/pay", obj);
        return response.data;
    }catch(error){
        return null;
    }
}