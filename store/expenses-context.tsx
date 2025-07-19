import { createContext, PropsWithChildren, useReducer } from "react";
import Expense from "../types/expense";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2021-12-18"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e8",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2025-07-13"),
  },
  {
    id: "e9",
    description: "A book",
    amount: 14.99,
    date: new Date("2025-07-15"),
  },
  {
    id: "e10",
    description: "Another book",
    amount: 18.59,
    date: new Date("2025-07-18"),
  },
];

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expenseData: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expenseData: Omit<Expense, "id">) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type Action =
  | { type: "ADD"; payload: Omit<Expense, "id"> }
  | { type: "UPDATE"; payload: { id: string; data: Omit<Expense, "id"> } }
  | { type: "DELETE"; payload: string };

function expensesReducer(state: Expense[], action: Action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

type Props = PropsWithChildren<{}>;

export default function ExpensesContextProvider({ children }: Props) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: Omit<Expense, "id">) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseData: Omit<Expense, "id">) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value: ExpensesContextType = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
