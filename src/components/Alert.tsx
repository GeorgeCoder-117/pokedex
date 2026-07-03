import React from "react";
import { StyleSheet, View,Text, TouchableOpacity } from "react-native";

const Alert = ({...props}) => {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorTitle}>¡Ups! Something goes wrong</Text>
      <Text style={styles.errorMessage}>{props.errorMsg}</Text>
      <TouchableOpacity
        style={[styles.btn, {backgroundColor: "#007aff"}]}
        onPress={props.onRetry}
      >
        <Text style={styles.btnText}>Retry connection</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, {backgroundColor: "#fff", marginTop: 40}]} onPress={props.onLoadCache}>
        <Text style={[styles.btnText, {color: "#000"}]}>Offline mode</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f5f5f5",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff3b30",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  btn: {
    width: '80%',
    borderRadius: 50,
    paddingVertical: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Alert;
