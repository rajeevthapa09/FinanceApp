import {createBrowserRouter} from "react-router-dom";
import Signup from "./Signup"
import Login from "./Login";
import Chat from "./Chat";

const loginRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/chat",
        element: <Chat />
    }
])

export default loginRouter