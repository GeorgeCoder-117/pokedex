import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Image } from "expo-image";
import { POKE_LOCAL_IMGS, POKE_SERVER_IMGS } from "@/constants/pokeImages";
import { Ionicons } from "@expo/vector-icons";

//Aqui agregue el interface de PokeCardProps para tipar las props que recibe el componente PokeCard, ya que anteriormente no estaba tipado y me era funcional ya que solo lo ocupaba para la screen de Home, pero ahora tiene distintas props que pueden ser utilizadas en otras vistas como la screen de Favoritos,y eso generaba errores en el código.
interface PokeCardProps {
  name: string;
  url?: string;
  id?: string;
  urlImg: string;
  handlePress?: () => void;
  handleSaveFavPokemon?: () => void;
  fav?: boolean;
  showFavIcon?: boolean;
}

const PokeCard = ({ ...item }: PokeCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={item.handlePress}>
      <Text style={styles.name}>
        {item.id}. {item.name}
      </Text>
      <View style={styles.containerPokemonImg}>
        <Image
          style={styles.image}
          source={{ uri: item.urlImg }}
          placeholder={POKE_LOCAL_IMGS[item.name]}
          contentFit="cover"
          placeholderContentFit="contain" // Para contener la imagen del Place Holder y funja como imágen provisional
          transition={200} // Mejora rendimiento en listas
          cachePolicy="disk" // Guarda imagen en disco duro
        />
      </View>
      {item.showFavIcon && (
        <TouchableOpacity
          style={styles.favContainer}
          onPress={item.handleSaveFavPokemon}
        >
          <Ionicons
            name={item.fav ? "bookmark" : "bookmark-outline"}
            size={30}
            color={"#212121"}
          />
        </TouchableOpacity>
      )}
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
  containerPokemonImg: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 210,
  },

  favContainer: {
    alignSelf: 'flex-end', //Agregue esta propiedad para poner el botón de guardado al final a la derecha y no en medio como estaba antes.
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});

export default PokeCard;
