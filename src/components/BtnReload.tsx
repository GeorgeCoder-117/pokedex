import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const BtnReload = ({ reload }: { reload: () => void }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: "#007aff" }]}
      onPress={reload}
    >
      <Text style={styles.btnText}>Retry connection</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "80%",
    borderRadius: 50,
    paddingVertical: 10,
    alignSelf: "center",
    marginTop: 50,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BtnReload;
