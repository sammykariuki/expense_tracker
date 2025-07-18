import ExpensesOutput, {
  DUMMY_EXPENSES,
} from "../components/ExpensesOutput/ExpensesOutput";

export default function AllExpenses() {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod="Total" />;
}
