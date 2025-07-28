import axios from "axios";
import ExpenseData from "../types/expense-data";

const BACKEND_URL = process.env.EXPO_FIREBASE_REALTIMEDATABASE_URL;

export async function storeExpense(expenseData: ExpenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateBackEndExpense(id: string, expenseData: ExpenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteBackEndExpense(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
