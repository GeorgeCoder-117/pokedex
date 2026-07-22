import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { POKE_SERVER_IMGS, POKE_LOCAL_IMGS } from "@/constants/pokeImages";

import PokeCard from "@/components/PokeCard";
import LoaderData from "@/components/LoaderData";

//Aqui solo comenté el interface de Favs que al final no era necesario ya que solo se necesita el interface de Fav para el Array de favoritos, ya que el Array de favoritos es un Array de objetos con las propiedades name y urlImg.
interface Fav {
  name: string;
  urlImg: string;
}

// interface Favs {
//   data: Fav[];
// }

const Favorites = () => {
  const [favs, setFavs] = useState<Fav[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFavs();
  }, []);

  const fetchFavs = async () => {
    setLoading(true);
    const getFavPokemons = await AsyncStorage.getItem("favorite_pokemons");
    const getPokemons = JSON.parse(getFavPokemons as string);
    setFavs(getPokemons);
    setLoading(false);
  };

  if (loading) {
    return <LoaderData />;
  }

  return (
    <>
      {favs && favs.length > 0 ? (
        <View style={styles.container}>
          <Text style={styles.txtMainTitle}>Favoritos</Text>

          <FlatList
            style={{ marginBottom: 20 }}
            data={favs}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <PokeCard {...item} />}
            // refreshing={loading}
            // onRefresh={onRefresh}
          />
        </View>
      ) : (
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center", padding: 20 },
          ]}
        >
          <Text style={styles.txtWarning}>
            Por el momento no hay Pokemon favoritos guardados
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  txtMainTitle: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "left",
    marginLeft: 10,
    marginBottom: 20,
  },

  txtWarning: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Favorites;
