import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Advisor from "./Advisor";
import Stocks from "./Stocks"


export default function Header(){
    let navigate = useNavigate();
    const goProfile = () => navigate("/viewProfile")

    return(
        <header>
        <h1>Your Website Name</h1>
        <nav>
          <ul>
            <li><Advisor /></li>
            <li><Profile /></li>
            <li><Stocks /></li>
          </ul>
        </nav>
      </header>
    )
}