
import { useState, useRef, useContext, useEffect } from "react";
import { addBudget, getBudget } from "./network";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import { CSVLink } from "react-csv"
import Chart from "chart.js/auto"
import { Pie } from "react-chartjs-2"

export default function Home() {

    const{state, setState} = useContext(GlobalContext);

    const [budget, setBudget] = useState({
        wages: { expected: "", actual: "", notes: "" }, 
        otherIncome: { expected: "", actual: "", notes: "" },
        rent: { expected: "", actual: "", notes: "" }, 
        groceries: { expected: "", actual: "", notes: "" },
        limit: ""
    });

    // const updateBudget = (category, type, value) => {
    //     setBudget((prev) => ({ ...prev, [category]: { ...prev[category], [type]: value } }))
    // }

    const updateBudget = (category, type, value) => {
        setBudget((prev) => ({...prev, [category] : {...prev[category], [type] : value}}))
    }

    
    const refYear = useRef();
    const refMonth = useRef();

    const totalIncome = (parseInt(budget.wages.actual) || 0) + (parseInt(budget.otherIncome.actual) || 0);
    const totalExpense = (parseInt(budget.rent.actual) || 0) + (parseInt(budget.groceries.actual) || 0);
    
    const submitBudget = async () => {
        const ret = await addBudget({ budget, date: `${refYear.current.value}-${refMonth.current.value}` });
        if (ret.success) {
            alert("successfully submitted");
        }
    }

    const viewBudget = async () => {
        try {
            const ret = await getBudget(`${refYear.current.value}-${refMonth.current.value}`, state.user)
            if (ret.data) {
                setBudget({ ...ret.data.budget });
            } else {
                setBudget({
                    wages: { expected: "", actual: "", notes: "" }, otherIncome: { expected: "", actual: "", notes: "" },
                    rent: { expected: "", actual: "", notes: "" }, groceries: { expected: "", actual: "", notes: "" },
                    limit:""
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    const csvData = [
        ["Categories", "Actual", "Expected", "Notes"],
        ["Wages",budget.wages.actual,budget.wages.expected,budget.wages.notes ],
        ["Other Income", budget.otherIncome.actual,budget.otherIncome.expected,budget.otherIncome.notes],
        ["Rent/Mortgage", budget.rent.actual,budget.rent.expected,budget.rent.notes],
        ["Groceries", budget.groceries.actual,budget.groceries.expected,budget.groceries.notes]
    ]

    const pieData = {
        labels: ["Wages", "Other Income", "Rent/Mortgage", "Groceries"],
        datasets:[
            {
                label: "Expenses",
                data: [budget.wages.actual, budget.otherIncome.actual, budget.rent.actual, budget.groceries.actual]
            }
        ]
    }
    let navigate = useNavigate();

    const goProfile = () => {
        navigate("/viewProfile")
    }

    const goAdvisor = () => {
        console.log("home page: ", state);
        navigate("/bookAdvisor")
    }

    const goStocks = () => {
        navigate("/stocks")
    }

    return (
        <div>
            <label>Select Date: </label>
            <select defaultValue={new Date().getFullYear()} ref={refYear}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
            </select>
            <select defaultValue={new Date().getMonth() + 1} ref={refMonth}>
                <option value="1">January</option>
                <option value="2">Febuary</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <button onClick={viewBudget}>View Budget</button>
            <CSVLink data={csvData}>Convert to CSV</CSVLink><br />
            <input placeholder="Set the budget limit" type="text" onChange = {e => setBudget({...budget, limit:e.target.value})} value={budget.limit}></input>
            

            <table>
                <tr>
                    <th>Income/Expense</th>
                    <th>Expected</th>
                    <th>Actual</th>
                    <th>Notes</th>
                </tr>
                <tr>
                    <td>Wages</td>
                    <td><input value={budget.wages.expected} type="text" onChange={(e) => updateBudget("wages", "expected", e.target.value)} /></td>
                    <td><input value={budget.wages.actual} type="text" onChange={(e) => updateBudget("wages", "actual", e.target.value)} /></td>
                    <td><input value={budget.wages.notes} type="text" onChange={(e) => updateBudget("wages", "notes", e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Other Income</td>
                    <td><input value={budget.otherIncome.expected} type="text" onChange={(e) => updateBudget("otherIncome", "expected", e.target.value)} /></td>
                    <td><input value={budget.otherIncome.actual} type="text" onChange={(e) => updateBudget("otherIncome", "actual", e.target.value)} /></td>
                    <td><input value={budget.otherIncome.notes} type="text" onChange={(e) => updateBudget("otherIncome", "notes", e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Rent/Mortgage</td>
                    <td><input value={budget.rent.expected} type="text" onChange={(e) => updateBudget("rent", "expected", e.target.value)} /></td>
                    <td><input value={budget.rent.actual} type="text" onChange={(e) => updateBudget("rent", "actual", e.target.value)} /></td>
                    <td><input value={budget.rent.notes} type="text" onChange={(e) => updateBudget("rent", "notes", e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Groceries</td>
                    <td><input value={budget.groceries.expected} type="text" onChange={(e) => updateBudget("groceries", "expected", e.target.value)} /></td>
                    <td><input value={budget.groceries.actual} type="text" onChange={(e) => updateBudget("groceries", "actual", e.target.value)} /></td>
                    <td><input value={budget.groceries.notes} type="text" onChange={(e) => updateBudget("groceries", "notes", e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Total Income: </td>
                    <td>{totalIncome} </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Total Expenses: </td>
                    <td>{totalExpense}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Savings</td>
                    <td>{totalIncome - totalExpense}</td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <button onClick={submitBudget}>Submit</button>
            <div style={{width: "350px", height: "350px"}}><Pie data={pieData} /></div>
            <button onClick={goProfile}>Profile</button>
            <button onClick={goAdvisor}>Advisor List</button>
            <button onClick={goStocks}>Stocks</button>
        </div>
    )
}