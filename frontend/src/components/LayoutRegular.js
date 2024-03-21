import {createBrowserRouter} from "react-router-dom";
import PastBudget from "./PastBudget";
import Home from "./Home"
import Profile from "./Profile"
import ViewMsg from "./ViewMsg"
import Savings from "./Savings"
import AdvisorList from "./AdvisorList";
import Payment from "./Payment"
import StockTest from "./StockTest";
import Chat from "./Chat";

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
        element: <StockTest />
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
    },
    {
        path: "/chat",
        element: <Chat />
    }
])

export default myrouter