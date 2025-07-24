import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export default function AllExpenses() {
  const expenses = useSelector((state: RootState) => state.myExpenses.expenses);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallback="No registered Expenses found"
    />
  );
}
