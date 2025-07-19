import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type IoniconSize = React.ComponentProps<typeof Ionicons>["size"];
type IoniconColor = React.ComponentProps<typeof Ionicons>["color"];

type Props = {
  icon: IoniconName;
  size: IoniconSize;
  color: IoniconColor;
  onPress: () => void;
};

export default function IconButton({ icon, size, color, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
