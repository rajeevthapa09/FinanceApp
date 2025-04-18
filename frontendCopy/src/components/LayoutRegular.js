import {createBrowserRouter} from "react-router-dom";
import PastBudget from "./PastBudget";
import Home from "./Home"
import Profile from "./Profile"
import BookAdvisor from "./BookAdvisors"
import ViewMsg from "./ViewMsg"
import Stocks from "./Stocks"
import Savings from "./Savings"
import BuySellStocks from "./BuySellStocks";
import AdvisorList from "./AdvisorList";
import Payment from "./Payment"

const myrouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/viewProfile",
        element: <Profile />
    },
    {
        path: "/bookAdvisor",
        element: <AdvisorList />
    },
    {
        path: "/viewMsg",
        element: <ViewMsg />
    },
    {
        path: "/stocks",
        element: <Stocks />
    },
    {
        path: "/makePayment",
        element: <Payment />
    },
    {
        path: "/viewSavings",
        element: <Savings />
    },
    {
        path: "/pastBudget",
        element: <PastBudget />
    }
])

export default myrouter