import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";

const EmptyCard = () => {
  return (
    <View style={styles.emptyCard}>
      <Image
        style={styles.headerImage}
        source={require("../../assets/img/pokemonLogo.webp")}
        placeholder={"pokemon"}
        contentFit="cover"
        cachePolicy="disk"
      />
      <Text style={{ textAlign: "center", padding: 20 }}>
        No Pokemons found yet. Retry later.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCard: {
    backgroundColor: "#F6F7F2",
    flexDirection: "column",
    borderRadius: 20,
    elevation: 3,
    margin: 10,
  },
  headerImage: {
    width: "auto",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default EmptyCard;
