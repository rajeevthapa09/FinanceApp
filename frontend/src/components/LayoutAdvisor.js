import {createBrowserRouter} from "react-router-dom";
import Advisor from "./Advisor"
import Profile from "./Profile";
import Chat from "./Chat";

const advisorRouter = createBrowserRouter([
    {
        path: "/",
        element: <Advisor />
    },
    {
        path: "/viewProfile",
        element: <Profile />
    },
    {
        path: "/chat",
        element: <Chat />
    }
])

export default advisorRouter