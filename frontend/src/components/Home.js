
import { useState, useRef, useContext, useEffect } from "react";
import { addBudget, getBudget } from "./network";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import { CSVLink } from "react-csv"
import Chart from "chart.js/auto"
import { Pie } from "react-chartjs-2"

export default function Home() {

    const { state, setState } = useContext(GlobalContext)

    const yearRef = useRef();
    const monthRef = useRef();

    const [budget, setBudget] = useState({
        wages: { expected: "", actual: "", notes: "" },
        otherIncome: { expected: "", actual: "", notes: "" },
        rent: { expected: "", actual: "", notes: "" },
        groceries: { expected: "", actual: "", notes: "" }
    })


    const updateBudgetData = (category, field, value) => {
        setBudget((prev) => ({
            ...prev, [category]: { ...prev[category], [field]: value }
        }))
    }

    const totalIncome = parseInt(budget.wages.actual || 0) + parseInt(budget.otherIncome.actual || 0);
    const totalExpense = parseInt(budget.rent.actual || 0) + parseInt(budget.groceries.actual || 0);

    const submitBudget = async () => {
        console.log(yearRef.current.value, "year", monthRef.current.value, "month");
        try {
            const ret = await addBudget({ date: `${yearRef.current.value}-${monthRef.current.value}`, budget });
            console.log(ret);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect( () => {
        setState({...state})
    },[])

    const viewBudget = async () => {
        try {
            console.log("date", `${yearRef.current.value}-${monthRef.current.value}`)
            const ret = await getBudget(`${yearRef.current.value}-${monthRef.current.value}`, state.user);
            console.log(ret.data, "viewBudget");
            // setBudget({...budget, wages: ret.wages, otherIncome: ret.otherIncome, rent: ret.rent, groceries: ret.groceries});
            if (ret.data) {
                setBudget({ ...ret.data.budget })
            } else {
                setBudget({
                    wages: { expected: "", actual: "", notes: "" },
                    otherIncome: { expected: "", actual: "", notes: "" },
                    rent: { expected: "", actual: "", notes: "" },
                    groceries: { expected: "", actual: "", notes: "" }
                });
            }

        } catch (error) {
            console.log(error);
        }
    }
    let navigate = useNavigate();
    const goProfile = () => {
        navigate("/viewProfile")
    }
    const csvData = [
        ["Categories", "Expected", "Actual", "Notes"],
        ["wages", budget.wages.expected, budget.wages.actual, budget.wages.notes],
        ["Other Income", budget.otherIncome.expected, budget.otherIncome.actual, budget.otherIncome.notes],
        ["Rent", budget.rent.expected, budget.rent.actual, budget.rent.notes],
        ["Groceries", budget.groceries.expected, budget.groceries.actual, budget.groceries.notes],
        ["Total Income", totalIncome],
        ["Total Expense", totalExpense],
        ["Savings", totalIncome - totalExpense]
    ]

    const pieData = {
        labels: ["Wages", "Other Income", "Rent/Mortgage", "Groceries"],
        datasets: [
            {
                label: "Income/Expenses",
                data: [budget.wages.actual, budget.otherIncome.actual, budget.rent.actual, budget.groceries.actual],
                backgroundColor: [
                    "#007D9C",
                    "#244D70",
                    "#D123B3",
                    "#F7E018"
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)"
                ],
                borderWidth: 1,
            },
        ],
    };

    const getAdvisor = () => {
        navigate("/bookAdvisor")
    }

    const getStocks = () => {
        navigate("/stocks")
    }


    return (
        <div>
            {/* <button onClick={viewProfile}>View Profile</button> */}
            <label>Select Date:</label>
            <select defaultValue={new Date().getFullYear()} ref={yearRef} >
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
            <select defaultValue={new Date().getMonth()} ref={monthRef}>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">Aug</option>
                <option value="9">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
            </select>
            <button onClick={viewBudget}>View Budget</button>
            <CSVLink data={csvData}>Convert to CSV</CSVLink>

            <table>
                <tr>
                    <th>Income/Expense</th>
                    <th>Expected</th>
                    <th>Actual</th>
                    <th>Notes</th>
                </tr>
                <tr>
                    <td>Wages</td>
                    <td>
                        <input
                            type="text"
                            value={budget.wages.expected}
                            onChange={e => updateBudgetData('wages', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budget.wages.actual}
                            onChange={e => updateBudgetData('wages', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budget.wages.notes}
                            onChange={e => updateBudgetData('wages', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Other Income</td>
                    <td>
                        <input
                            type="text"
                            value={budget.otherIncome.expected}
                            onChange={(e) => updateBudgetData('otherIncome', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budget.otherIncome.actual}
                            onChange={(e) => updateBudgetData('otherIncome', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budget.otherIncome.notes}
                            onChange={(e) => updateBudgetData('otherIncome', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Rent/Mortgage</td>
                    <td>
                        <input
                            type="text"
                            value={budget.rent.expected}
                            onChange={(e) => updateBudgetData('rent', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budget.rent.actual}
                            onChange={(e) => updateBudgetData('rent', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budget.rent.notes}
                            onChange={(e) => updateBudgetData('rent', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Groceries</td>
                    <td>
                        <input
                            type="text"
                            value={budget.groceries.expected}
                            onChange={(e) => updateBudgetData('groceries', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budget.groceries.actual}
                            onChange={(e) => updateBudgetData('groceries', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budget.groceries.notes}
                            onChange={(e) => updateBudgetData('groceries', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>Total Income:</td>
                    <td>
                        <input type="text" value={totalIncome} />
                    </td>
                </tr>
                <tr>
                    <td>Total Expense:</td>
                    <td>
                        <input type="text" value={totalExpense} />
                    </td>
                </tr>
                <tr>
                    <td>Savings:</td>
                    <td>
                        <input type="text" value={totalIncome - totalExpense} />
                    </td>
                </tr>
            </table>
            <button onClick={submitBudget}>Submit</button>
            <div style={{width: "350px", height: "350px"}}><Pie data={pieData} width={20} height={20} /></div>
            <button onClick={goProfile}>Profile</button>
            <button onClick={getAdvisor}>Advisor List</button>
            <button onClick={getStocks}>Stocks</button>
        </div>
    )
}