import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import { POKE_LOCAL_IMGS, POKE_SERVER_IMGS } from "@/constants/pokeImages";

const PokeCard = ({ ...item }) => {
  return (
      <TouchableOpacity style={styles.card} onPress={item.handlePress}>
        <Text style={styles.name}>{item.url.split("/").filter(Boolean)[item.url.split("/").filter(Boolean).length - 1]}. {item.name}</Text>
        <Image
          style={styles.image}
          source={{ uri: POKE_SERVER_IMGS[item.name] }}
          placeholder={POKE_LOCAL_IMGS[item.name]}
          contentFit="cover"
          transition={200} // Mejora rendimiento en listas
          cachePolicy="disk" // Guarda imagen en disco duro
        />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F6F7F2",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    margin: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  image: {
    width: "auto",
    height: 200,
  },
});

export default PokeCard;
