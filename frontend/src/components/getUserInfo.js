import axios from 'axios';
import { userEmail } from './network';


export async function getUserInfo() {
    const url = `/userinfo/${userEmail}`;
    try {
        const res = await axios.get(url);
        console.log("network", res);
        return res.data;

    } catch (error) {
        return null;
    }
}
