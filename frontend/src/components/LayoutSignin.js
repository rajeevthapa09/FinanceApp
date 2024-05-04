import {createBrowserRouter} from "react-router-dom";
import Signup from "./Signup"
import Login from "./Login";
import StockTest from "./StockTest";

const loginRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }
])

export default loginRouter