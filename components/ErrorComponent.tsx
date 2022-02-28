import React from "react"
import { StyleSheet } from "react-native";
import { View, Text } from "./Themed"

type PropTypes = {
  message: string | null | undefined;
}

export default function Error({ message }: PropTypes) {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  }
});