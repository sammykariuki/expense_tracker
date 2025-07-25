import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../utils/styles";
import { addExpense, deleteExpense, updateExpense } from "../redux/expenses";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ExpenseData from "../types/expense-data";
import {
  deleteBackEndExpense,
  storeExpense,
  updateBackEndExpense,
} from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

export default function ManageExpense({ route, navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; //converts to boolean

  const expenses = useSelector((state: RootState) => state.myExpenses.expenses);
  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [lastAction, setLastAction] = useState<
    null | "add" | "update" | "delete"
  >(null);
  const [lastData, setLastData] = useState<ExpenseData | null>(null);
  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    if (editedExpenseId) {
      setIsSubmitting(true);
      setLastAction("delete");
      try {
        await deleteBackEndExpense(editedExpenseId);
        dispatch(deleteExpense({ id: editedExpenseId }));
        navigation.goBack();
      } catch (error) {
        setError("Could not delete expense");
        setIsSubmitting(false);
      }
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: ExpenseData) {
    setIsSubmitting(true);
    setLastData(expenseData);
    if (isEditing) {
      setLastAction("update");
      try {
        await updateBackEndExpense(editedExpenseId, expenseData);
        dispatch(
          updateExpense({
            id: editedExpenseId,
            expenseData: {
              ...expenseData,
              date: expenseData.date.toISOString(),
            },
          })
        );
        navigation.goBack();
      } catch (error) {
        setError("Could not update expense");
        setIsSubmitting(false);
      }
    } else {
      setLastAction("add");
      try {
        const id = await storeExpense(expenseData);
        dispatch(
          addExpense({
            expenseData: {
              ...expenseData,
              date: expenseData.date.toISOString(),
              id: id,
            },
          })
        );
        navigation.goBack();
      } catch (error) {
        setError("Could not Add Expense");
        setIsSubmitting(false);
      }
    }
  }
  function errorHandler() {
    setError(undefined);

    if (lastAction === "delete") {
      deleteExpenseHandler();
    } else if (lastAction === "add" && lastData) {
      confirmHandler(lastData);
    } else if (lastAction === "update" && lastData) {
      confirmHandler(lastData);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
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
