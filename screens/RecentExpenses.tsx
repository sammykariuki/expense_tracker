import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getDateMinusDays } from "../utils/date";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../utils/http";
import { setExpenses } from "../redux/expenses";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function RecentExpenses() {
  const expenses = useSelector((state: RootState) => state.myExpenses.expenses);
  const dispatch = useDispatch<AppDispatch>();

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | undefined>();

  async function getExpenses() {
    setIsFetching(true);
    try {
      const fetchedExpenses = await fetchExpenses();
      dispatch(setExpenses({ expenses: fetchedExpenses }));
    } catch (error) {
      setError("Could not fetch expenses!");
    }
    setIsFetching(false);
  }

  useEffect(() => {
    getExpenses();
  }, []);

  function errorHandler() {
    setError(undefined);
    getExpenses();
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

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
