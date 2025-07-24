import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../utils/styles";
import { addExpense, deleteExpense, updateExpense } from "../redux/expenses";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ExpenseData from "../types/expense-data";
type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

export default function ManageExpense({ route, navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; //converts to boolean

  const expenses = useSelector((state: RootState) => state.myExpenses.expenses);
  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    if (editedExpenseId) {
      dispatch(deleteExpense({ id: editedExpenseId }));
    }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData: ExpenseData) {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editedExpenseId,
          expenseData: {
            ...expenseData,
            date: expenseData.date.toISOString(),
          },
        })
      );
    } else {
      dispatch(
        addExpense({
          expenseData: {
            ...expenseData,
            date: expenseData.date.toISOString(),
          },
        })
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
  },
});
