import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../utils/styles";
import Button from "../components/UI/Button";
import { addExpense, deleteExpense, updateExpense } from "../redux/expenses";
type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

export default function ManageExpense({ route, navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; //converts to boolean

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

  function confirmHandler() {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editedExpenseId,
          expenseData: {
            description: "Test!!",
            amount: 29.99,
            date: new Date("2022-05-20").toISOString(),
          },
        })
      );
    } else {
      dispatch(
        addExpense({
          expenseData: {
            description: "Test",
            amount: 19.99,
            date: new Date("2025-07-19").toISOString(),
          },
        })
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
