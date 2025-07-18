import { FlatList, ListRenderItemInfo, Text } from "react-native";
import Expense from "../../types/expense";

type Props = {
  expenses: Expense[];
};

function renderExpenseItem(itemData: ListRenderItemInfo<Expense>) {
  return <Text>{itemData.item.description}</Text>;
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
