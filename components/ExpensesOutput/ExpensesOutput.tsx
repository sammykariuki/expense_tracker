import { StyleSheet, View, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import Expense from "../../types/expense";
import { GlobalStyles } from "../../utils/styles";

type Props = {
  expenses: Expense[];
  expensesPeriod: string;
  fallback: string;
};

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallback,
}: Props) {
  let content = <Text style={styles.infoText}>{fallback}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
