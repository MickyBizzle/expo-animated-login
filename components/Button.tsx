import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

type ButtonProps = {
  children: string;
  style?: object;
  textStyle?: object;
  pressedColor?: string;
  onPress: () => void;
};

export const Button = ({
  children,
  style,
  textStyle,
  pressedColor,
  onPress,
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View
        style={[
          styles.button,
          style,
          isPressed
            ? pressedColor
              ? { backgroundColor: pressedColor }
              : styles.isPressed
            : null,
        ]}
      >
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  isPressed: {
    backgroundColor: "#cccccc",
  },
});
