import axios from 'axios'
axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
const userEmail = localStorage.getItem("userEmail")

export async function signup(user){
    const url ="/signup";
    try{
        const res = await axios.post (url, user);
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

export async function getBudget(date){
    console.log("getbudg", date)
    const url = `/getBudget/${date}/${userEmail}`;
    try{
        const res = await axios.get(url);
        return res.data;
    }catch(error){
        return null;
    }
}

export async function getUserInfo(){
    const url = `/userInfo/${userEmail}`;
    try{
        const res = await axios.get(url);
        return res.data;
    }catch(error){
        return null;
    }
}