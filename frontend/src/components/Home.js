
import { useState } from "react";

export default function Home() {

    const [budgetData, setBudgetData] = useState({
        wages: { expected: '', actual: '', difference: '', notes: '' },
        otherIncome: { expected: '', actual: '', difference: '', notes: '' },
        rentMortgage: { expected: '', actual: '', difference: '', notes: '' },
        groceries: { expected: '', actual: '', difference: '', notes: '' },
        restaurants: { expected: '', actual: '', difference: '', notes: '' },
        insurance: { expected: '', actual: '', difference: '', notes: '' },
        utilities: { expected: '', actual: '', difference: '', notes: '' },
        gas: { expected: '', actual: '', difference: '', notes: '' },
        entertainment: { expected: '', actual: '', difference: '', notes: '' },
        loans: { expected: '', actual: '', difference: '', notes: '' },
    });

    const updateBudgetData = (category, field, value) => {
        setBudgetData((prevData) => ({
            ...prevData,
            [category]: { ...prevData[category], [field]: value },
        }));
    };

    const calculateTotals = () => {
        const incomeCategories = ['wages', 'otherIncome'];
        const expenseCategories = [
            'rentMortgage',
            'groceries',
            'restaurants',
            'insurance',
            'utilities',
            'gas',
            'entertainment',
            'loans',
        ];

        const totalIncome = incomeCategories.reduce(
            (sum, category) => sum + parseFloat(budgetData[category].actual || 0),
            0
        );

        const totalExpense = expenseCategories.reduce(
            (sum, category) => sum + parseFloat(budgetData[category].actual || 0),
            0
        );

        const savings = totalIncome - totalExpense;

        return { totalIncome, totalExpense, savings };
    };

    // Get calculated totals
    const { totalIncome, totalExpense, savings } = calculateTotals();

    return (
        <div>
            <table>
                <tr>
                    <th>Income/Expense</th>
                    <th>Expected</th>
                    <th>Actual</th>
                    <th>Difference</th>
                    <th>Notes</th>
                </tr>
                <tr>
                    <td>Wages</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.wages.expected}
                            onChange={(e) => updateBudgetData('wages', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.wages.actual}
                            onChange={(e) => updateBudgetData('wages', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.wages.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.wages.notes}
                            onChange={(e) => updateBudgetData('wages', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Other Income</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.otherIncome.expected}
                            onChange={(e) => updateBudgetData('otherIncome', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.otherIncome.actual}
                            onChange={(e) => updateBudgetData('otherIncome', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.otherIncome.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.otherIncome.notes}
                            onChange={(e) => updateBudgetData('otherIncome', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Rent/Mortgage</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.rentMortgage.expected}
                            onChange={(e) => updateBudgetData('rentMortgage', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.rentMortgage.actual}
                            onChange={(e) => updateBudgetData('rentMortgage', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.rentMortgage.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.rentMortgage.notes}
                            onChange={(e) => updateBudgetData('rentMortgage', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Groceries</td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.groceries.expected}
                            onChange={(e) => updateBudgetData('groceries', 'expected', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.groceries.actual}
                            onChange={(e) => updateBudgetData('groceries', 'actual', e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.groceries.difference}
                            readOnly
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={budgetData.groceries.notes}
                            onChange={(e) => updateBudgetData('groceries', 'notes', e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
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
                </tr>

            </table>
            <table>
                <tr>
                    <td>Total Income:</td>
                    <td>
                        <input type="text" value={totalIncome} readOnly />
                    </td>
                </tr>
                <tr>
                    <td>Total Expense:</td>
                    <td>
                        <input type="text" value={totalExpense} readOnly />
                    </td>
                </tr>
                <tr>
                    <td>Savings:</td>
                    <td>
                        <input type="text" value={savings} readOnly />
                    </td>
                </tr>
            </table>
        </div>
    )
}