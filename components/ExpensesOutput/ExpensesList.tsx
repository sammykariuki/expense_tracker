import { FlatList, ListRenderItemInfo, Text } from "react-native";
import Expense from "../../types/expense";
import ExpenseItem from "./ExpenseItem";

type Props = {
  expenses: Expense[];
};

function renderExpenseItem(itemData: ListRenderItemInfo<Expense>) {
  return <ExpenseItem {...itemData.item} />;
}

export default function ExpensesList({ expenses }: Props) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
