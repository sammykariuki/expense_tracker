import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Expense from "../types/expense";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19").toISOString(),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05").toISOString(),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01").toISOString(),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19").toISOString(),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2021-12-18").toISOString(),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19").toISOString(),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05").toISOString(),
  },
  {
    id: "e8",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2025-07-13").toISOString(),
  },
  {
    id: "e9",
    description: "A book",
    amount: 14.99,
    date: new Date("2025-07-15").toISOString(),
  },
  {
    id: "e10",
    description: "Another book",
    amount: 18.59,
    date: new Date("2025-07-18").toISOString(),
  },
];

type ExpensesState = {
  expenses: Expense[];
};
const initialState: ExpensesState = {
  expenses: DUMMY_EXPENSES,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (
      state,
      action: PayloadAction<{
        expenseData: Omit<Expense, "id">;
      }>
    ) => {
      const id = new Date().toISOString() + Math.random().toString();
      state.expenses = [
        { id: id, ...action.payload.expenseData },
        ...state.expenses,
      ];
    },
    deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
    updateExpense: (
      state,
      action: PayloadAction<{
        id: string;
        expenseData: Omit<Expense, "id">;
      }>
    ) => {
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state.expenses[updatableExpenseIndex];
      const updatedItem = {
        ...updatableExpense,
        ...action.payload.expenseData,
      };
      const updatedExpenses = [...state.expenses];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      state.expenses = updatedExpenses;
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export default expensesSlice.reducer;
