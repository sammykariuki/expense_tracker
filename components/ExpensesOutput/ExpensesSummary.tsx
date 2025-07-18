import { View, Text } from "react-native";
import Expense from "../../types/expense";

type Props = {
  expenses: Expense[];
  periodName: string;
};

export default function ExpensesSummary({ expenses, periodName }: Props) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}
