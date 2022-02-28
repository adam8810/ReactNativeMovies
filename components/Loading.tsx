import React from "react"
import { StyleSheet, ActivityIndicator } from "react-native";
import { View } from "react-native"

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
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