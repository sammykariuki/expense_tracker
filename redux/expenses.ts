import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Expense from "../types/expense";

type ExpensesState = {
  expenses: Expense[];
};
const initialState: ExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (
      state,
      action: PayloadAction<{
        expenseData: Expense;
      }>
    ) => {
      state.expenses = [{ ...action.payload.expenseData }, ...state.expenses];
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
    setExpenses: (state, action: PayloadAction<{ expenses: Expense[] }>) => {
      const inverted = action.payload.expenses.reverse();
      state.expenses = inverted;
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export const setExpenses = expensesSlice.actions.setExpenses;
export default expensesSlice.reducer;
