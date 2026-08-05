# Expense Tracker

A React Native mobile application for tracking personal expenses, built with Expo and backed by Firebase Realtime Database. Part of a React Native course project (Section 8).

## Features

- **Add, edit, and delete expenses** through a modal form with validation
- **Recent Expenses view** — filters and displays expenses from the last 7 days
- **All Expenses view** — shows every recorded expense with a running total
- **Summary card** — displays total spending for the selected period (in KES)
- **Form validation** — ensures amount, date, and description are valid before submission
- **Error handling** — shows error overlays with retry functionality
- **Loading states** — activity indicators during async operations

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native (Expo SDK 53) | Cross-platform mobile framework |
| TypeScript | Type-safe JavaScript |
| Redux Toolkit | State management |
| React Navigation | Bottom tab + stack navigation |
| Axios | HTTP client |
| Firebase Realtime Database | Backend / persistent storage |

## Project Structure

```
expense_tracker/
├── App.tsx                  # Root component with navigation setup
├── index.ts                 # Entry point
├── components/
│   ├── ExpensesOutput/      # Expense list, summary, and item components
│   ├── ManageExpense/       # Expense form and input components
│   └── UI/                  # Reusable UI (Button, IconButton, overlays)
├── screens/
│   ├── AllExpenses.tsx      # Displays all expenses
│   ├── RecentExpenses.tsx   # Displays last 7 days of expenses
│   └── ManageExpense.tsx    # Add / edit expense modal
├── redux/
│   ├── store.ts             # Redux store configuration
│   └── expenses.ts          # Expenses slice (CRUD reducers)
├── utils/
│   ├── http.ts              # Firebase REST API calls (Axios)
│   ├── date.ts              # Date utility helpers
│   └── styles.ts            # Global color palette and styles
├── types/
│   ├── expense.ts           # Expense type definition
│   ├── expense-data.ts      # ExpenseData type (without id)
│   └── navigation.ts        # Navigation param list types
└── .env                     # Environment variables (Firebase URL)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A Firebase project with Realtime Database enabled

### Installation

```bash
git clone <repository-url>
cd expense_tracker
npm install
```

### Configuration

Create a `.env` file in the project root:

```
EXPO_FIREBASE_REALTIMEDATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
```

### Running the App

```bash
npm start
```

Then press:
- **a** to open on Android emulator
- **i** to open on iOS simulator
- **w** to open in a web browser

## How It Works

1. **Navigation** — A bottom tab navigator switches between "Recent" and "All Expenses" views. A "+" button in the header opens a modal to add new expenses.
2. **State Management** — Redux Toolkit manages the expenses list locally. Actions dispatch `addExpense`, `deleteExpense`, `updateExpense`, and `setExpenses`.
3. **Backend Sync** — All CRUD operations go through Firebase REST API endpoints via Axios. On app load, expenses are fetched and stored in Redux.
4. **Filtering** — The "Recent" tab filters expenses where the date falls within the last 7 days using a date utility function.
