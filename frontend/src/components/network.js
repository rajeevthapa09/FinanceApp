import axios from 'axios'
axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`

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

export async function login(user){
    const url = "/login";
    try{
        const res = await axios.post(url, user);
        return res.data;
    }catch (error){
        return null;
    }
}