import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import ExpenseData from "../../types/expense-data";
import Expense from "../../types/expense";
import { GlobalStyles } from "../../utils/styles";

type inputValuesType = {
  amount: {
    value: string;
    isValid: boolean;
  };
  date: {
    value: string;
    isValid: boolean;
  };
  description: {
    value: string;
    isValid: boolean;
  };
};

type inputIdentifierType = "amount" | "date" | "description";

type Props = {
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseData) => void;
  isEditing: boolean;
  defaultValues?: Omit<Expense, "id">;
};

export default function ExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
  defaultValues,
}: Props) {
  const [inputs, setInputs] = useState<inputValuesType>({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  function inputChangeHandler(
    inputIdentifier: inputIdentifierType,
    enteredValue: string
  ) {
    setInputs((i) => {
      return {
        ...i,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData: ExpenseData = {
      amount: +inputs.amount.value, //+ converts it to a number :)
      date: new Date(inputs.date.value),
      description: inputs.description.value.trimStart().trimEnd(),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateisValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateisValid || !descriptionIsValid) {
      setInputs((i) => {
        return {
          amount: { value: i.amount.value, isValid: amountIsValid },
          date: { value: i.date.value, isValid: dateisValid },
          description: {
            value: i.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => {
              inputChangeHandler("amount", text);
            },
            value: inputs.amount.value,
          }}
          label="Amount"
          style={styles.rowInput}
        />
        <Input
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (text) => {
              inputChangeHandler("date", text);
            },
            value: inputs.date.value,
          }}
          label="Date"
          style={styles.rowInput}
        />
      </View>
      <Input
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (text) => {
            inputChangeHandler("description", text);
          },
          value: inputs.description.value,
        }}
        label="Description"
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    textAlign: "center",
    marginVertical: 24,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
