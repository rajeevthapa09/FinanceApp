import {createBrowserRouter} from "react-router-dom";
import Advisor from "./Advisor"
import Profile from "./Profile";

const advisorRouter = createBrowserRouter([
    {
        path: "/",
        element: <Advisor />
    },
    {
        path: "/viewProfile",
        element: <Profile />
    },
])

export default advisorRouter