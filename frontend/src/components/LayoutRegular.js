import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PastBudget from "./PastBudget";
import Home from "./Home"
import Profile from "./Profile"
import ViewMsg from "./ViewMsg"
import Savings from "./Savings"
import AdvisorList from "./AdvisorList";
import Payment from "./Payment"
import StockTest from "./StockTest";
import Chat from "./Chat";

const LayoutRegular = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewProfile" element={<Profile />} />
        <Route path="/bookAdvisor" element={<AdvisorList />} />
        <Route path="/viewMsg" element={<ViewMsg />} />
        <Route path="/stocks" element={<StockTest />} />
        <Route path="/makePayment" element={<Payment />} />
        <Route path="/viewSavings" element={<Savings />} />
        <Route path="/pastBudget" element={<PastBudget />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default LayoutRegular;
