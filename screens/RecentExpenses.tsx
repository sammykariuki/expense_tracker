import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getDateMinusDays } from "../utils/date";

export default function RecentExpenses() {
  const expenses = useSelector((state: RootState) => state.myExpenses.expenses);

  const RecentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (
      new Date(expense.date) >= date7DaysAgo && new Date(expense.date) <= today
    );
  });
  return (
    <ExpensesOutput
      expenses={RecentExpenses}
      expensesPeriod="Last 7 Days"
      fallback="No Expenses Registered for the last 7 days"
    />
  );
}
