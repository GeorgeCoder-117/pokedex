import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import PokeCard from "@/components/PokeCard";
import EmptyCard from "@/components/EmptyCard";
import LoaderData from "@/components/LoaderData";
import Alert from "@/components/Alert";
import BtnReload from "@/components/BtnReload";
import { PokeService, Pokemons, ApiError } from "@/services/pokeService";
import { HomeScreenProps } from "@/types/navigationTypes";

import AsyncStorage from "@react-native-async-storage/async-storage"; //AsyncStorage con Expo
// import { createMMKV, MMKV } from "react-native-mmkv"; //Para dev-build usamos MMKV
// const storage = createMMKV();

const Home = ({ navigation }: HomeScreenProps) => {
  const [pokemons, setPokemons] = useState<Pokemons | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [errorApi, setErrorApi] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      if (!refreshing) setLoading(true);
      setErrorApi(null); // Limpiamos errores previos al reintentar

      const pokeData = await PokeService.getPokemons();
      setPokemons(pokeData); // -> ESTADO EXITOSO
      await AsyncStorage.setItem("poke_local_data", JSON.stringify(pokeData));
      // storage.set('poke_local_data', JSON.stringify(pokeData)); //Para dev-build usamos MMKV
    } catch (err: any) {
      // -> ESTADO DE ERROR (Econectividad o HTTP)
      const error = err as ApiError;
      setErrorApi(error.message);
    } finally {
      // -> ESTADO DE CARGA FINALIZADO
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Functions
  const handleCache = async () => {
    const cachedData = await AsyncStorage.getItem("poke_local_data");
    if (cachedData) {
      setErrorApi(null);
      setPokemons(JSON.parse(cachedData));
      await AsyncStorage.removeItem("poke_local_data"); //Experiencia Offline parcial, solo se usa 1 vez local storage, hasta que se vuelva a cargar la data desde la API
    } else {
      setErrorApi(null);
      setPokemons(null);
    }
    // const cachedData = storage.getString('poke_local_data');
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const handlePokemonPress = (name: string, urlId: string) => {
    const arrayUrlPieces = urlId.split("/").filter(Boolean);
    const id = arrayUrlPieces[arrayUrlPieces.length - 1];
    navigation.navigate("Pokemon", {
      name: name,
      id: id,
    });
  };

  //Props
  const propsAlert = {
    errorMsg: errorApi,
    onRetry: fetchData,
    onLoadCache: handleCache,
  };

  // 1.Render Inicial
  if (loading && !refreshing) {
    return <LoaderData />;
  }

  // 2. Render de Fallo de Conectividad / Errores de API
  if (errorApi) {
    return <Alert {...propsAlert} />;
  }

  // 3. Render response exitosa
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      {pokemons ? (
        <FlatList
          style={{ marginBottom: 20 }}
          data={pokemons.results}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PokeCard
              {...item}
              handlePress={() => handlePokemonPress(item.name, item.url)}
            />
          )}
          initialNumToRender={5} // Cuántos elementos cargar al inicio
          maxToRenderPerBatch={5} // Cuántos elementos renderizar por lote al hacer scroll
          windowSize={5} // Define el tamaño de la "ventana" de renderizado (menor número = menos memoria)
          removeClippedSubviews={true}
          refreshing={loading}
          onRefresh={onRefresh}
        />
      ) : (
        <>
          <EmptyCard />
          <BtnReload reload={fetchData} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    marginLeft: 10,
  },
});

export default Home;
