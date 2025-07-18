import ExpensesOutput, {
  DUMMY_EXPENSES,
} from "../components/ExpensesOutput/ExpensesOutput";

export default function RecentExpenses() {
  return (
    <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod="Last 7 Days" />
  );
}
