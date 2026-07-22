import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PokemonScreenProps } from "@/types/navigationTypes";

import PokeCardDetails from "@/components/PokeCardDetails";
import EmptyCard from "@/components/EmptyCard";
import BtnReload from "@/components/BtnReload";
import LoaderData from "@/components/LoaderData";
import Alert from "@/components/Alert";

import { PokeService, PokemonFeatures, ApiError } from "@/services/pokeService";
import AsyncStorage from "@react-native-async-storage/async-storage"; //AsyncStorage con Expo

const Pokemon = ({ navigation, route }: PokemonScreenProps) => {
  const { name, id, urlImg } = route.params;

  const [pokemon, setPokemon] = useState<PokemonFeatures | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [errorApi, setErrorApi] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      if (!refreshing) setLoading(true);
      setErrorApi(null);

      const pokeData = await PokeService.getPokemonFeatures(id);
      setPokemon(pokeData);
      await AsyncStorage.setItem("poke_id_local_data", JSON.stringify(pokeData));
    } catch (err: any) {
      const error = err as ApiError;
      setErrorApi(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Functions
  const handleCache = async () => {
    const cachedData = await AsyncStorage.getItem("poke_id_local_data");
    if (cachedData) {
      setErrorApi(null);
      setPokemon(JSON.parse(cachedData));
      await AsyncStorage.removeItem("poke_id_local_data"); //Experiencia Offline parcial, solo se usa 1 vez local storage, hasta que se vuelva a cargar la data desde la API
    } else {
      setErrorApi(null);
      setPokemon(null);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#0000ff"
        />
      }
    >
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={35} color={"#0000ff"} />
      </TouchableOpacity>
      {pokemon ? (
        <PokeCardDetails name={name} urlImg={urlImg} {...pokemon} />
      ) : (
        <>
          <EmptyCard />
          <BtnReload reload={fetchData} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
  },
  btnBack: {
    width: 40,
    paddingVertical: 10,
  },
});

export default Pokemon;
