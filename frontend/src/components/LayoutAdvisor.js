import {createBrowserRouter} from "react-router-dom";
import Advisor from "./Advisor"

const advisorRouter = createBrowserRouter([
    {
        path: "/",
        element: <Advisor />
    }
])

export default advisorRouter