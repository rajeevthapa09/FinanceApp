
import { useState, useRef } from "react";
import { addBudget, getBudget } from "./network";
import { useNavigate } from "react-router-dom";

export default function Home() {


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

    const viewBudget = async() => {
        try{
            console.log("date", `${yearRef.current.value}-${monthRef.current.value}`)
            const ret = await getBudget(`${yearRef.current.value}-${monthRef.current.value}`);
            console.log(ret.data);
            // setBudget({...budget, wages: ret.wages, otherIncome: ret.otherIncome, rent: ret.rent, groceries: ret.groceries});
            if(ret.data){
                setBudget({...ret.data.budget})
            }else{
                setBudget({
                    wages: { expected: "", actual: "", notes: "" },
                    otherIncome: { expected: "", actual: "", notes: "" },
                    rent: { expected: "", actual: "", notes: "" },
                    groceries: { expected: "", actual: "", notes: "" }
                });
            }
            
        }catch(error){
            console.log(error);
        }
    }
    // let navigate = useNavigate();
    // const viewProfile = () => {
    //     navigate("/viewProfile")
    // }


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
                {/*  <tr>
                    <td>Restaurants</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.restaurants.expected}
                            onChange={(e) => updateBudgetData('restaurants', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.restaurants.actual}
                            onChange={(e) => updateBudgetData('restaurants', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.restaurants.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.restaurants.notes}
                            onChange={(e) => updateBudgetData('restaurants', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Insurance</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.insurance.expected}
                            onChange={(e) => updateBudgetData('insurance', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.insurance.actual}
                            onChange={(e) => updateBudgetData('insurance', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.insurance.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.insurance.notes}
                            onChange={(e) => updateBudgetData('insurance', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Utilities</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.utilities.expected}
                            onChange={(e) => updateBudgetData('utilities', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.utilities.actual}
                            onChange={(e) => updateBudgetData('utilities', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.utilities.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.utilities.notes}
                            onChange={(e) => updateBudgetData('utilities', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Gas</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.gas.expected}
                            onChange={(e) => updateBudgetData('gas', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.gas.actual}
                            onChange={(e) => updateBudgetData('gas', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.gas.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.gas.notes}
                            onChange={(e) => updateBudgetData('gas', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Entertainment</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.entertainment.expected}
                            onChange={(e) => updateBudgetData('entertainment', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.entertainment.actual}
                            onChange={(e) => updateBudgetData('entertainment', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.entertainment.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.entertainment.notes}
                            onChange={(e) => updateBudgetData('entertainment', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Loans</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.loans.expected}
                            onChange={(e) => updateBudgetData('loans', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.loans.actual}
                            onChange={(e) => updateBudgetData('loans', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.loans.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.loans.notes}
                            onChange={(e) => updateBudgetData('loans', 'notes', e.target.value)}
                        />
                    </td>
                </tr> */}

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
        </div>
    )
}