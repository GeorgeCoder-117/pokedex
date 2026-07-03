import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

const LoaderData = () => {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.stateText}>Cargando datos...</Text>
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
  stateText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default LoaderData;
