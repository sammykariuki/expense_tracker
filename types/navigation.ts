import { NavigatorScreenParams } from "@react-navigation/native";

export type RootBottomParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

export type RootStackParamList = {
  ExpensesOverview: NavigatorScreenParams<RootBottomParamList>;
  ManageExpense: { expenseId?: string } | undefined;
};
