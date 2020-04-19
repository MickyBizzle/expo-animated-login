import React from "react";
import { StyleSheet, TextInput as RNTextInput } from "react-native";

type TextInputProps = {
  placeholder: string;
  placeholderTextColor?: string;
  style?: object;
  secureTextEntry?: boolean;
  keyboardType?: string;
  value: string;
  onChangeText: (text: string) => void;
};

export const TextInput = ({
  placeholder,
  placeholderTextColor,
  style,
  secureTextEntry,
  keyboardType,
  value,
  onChangeText,
}: TextInputProps) => {
  return (
    <RNTextInput
      placeholder={placeholder}
      style={[styles.textInput, style]}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
  },
});
