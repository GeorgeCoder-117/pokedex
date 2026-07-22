import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
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

import { POKE_SERVER_IMGS, POKE_LOCAL_IMGS } from "@/constants/pokeImages";

//Agregue el tipado del Array para no tener problemas con el state
type ArrayPokemons = {
  name: string;
  urlImg: string;
};

let arrayPokemons: ArrayPokemons[] = []; //Declare el Array para guardar Pokemons favoritos como hice la última vez con ustedes, agregandole el tipado. (Se que esta declaración sería mejor exportando el Array desde la capeta de constantes y no declarandolo en el Home.tsx, pero por ahora lo deje así) 

const Home = ({ navigation }: HomeScreenProps) => {
  const [pokemons, setPokemons] = useState<Pokemons | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [errorApi, setErrorApi] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      if (!refreshing) setLoading(true);
      setErrorApi(null); // Limpiamos errores previos al reintentar
      let pokeData = await PokeService.getPokemons();

      //Este cambio lo hice para mejorar como mostraba las imágenes, que es agregar nuevas props a la respuesta de la Api, como sería el id y la urlImg ya directamente para posteriormente guardarlos en el state de Pokemons, haciendo que las imágenes ya no se muestren por name como lo tenía antes si no por id, cabe mencionar que yo lo había hecho así porque no veía los sprites o imágenes de los Pokemon en la respuesta de la PokeApi al hacer pruebas, ya que las veía en Edge y ahí se dificulta más ver las propiedades, por eso mejor use Firefox y ahora si pude ver que la respuesta de la PokeApi si trae las imágenes de los Pokemon.
      const newPokeData = pokeData.results.map((poke) => ({
        ...poke,
        id: poke.url.split("/").filter(Boolean)[
          poke.url.split("/").filter(Boolean).length - 1
        ],
        urlImg: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.split("/").filter(Boolean)[poke.url.split("/").filter(Boolean).length - 1]}.png`,
        fav: false, // Del mismo modo aprovechando que estpy agregando props, añadí este booleano de Fav para control del guardado de Favoritos
        showFavIcon: true, // Agregamos prop de icono Fav para los pokemones para que se muestre en esta vista, ya que como estaba haciendo ese día iba a reutilizar la vista del componente PokeCard para la vista de Favoritos y no quería que se mostrara el icono de Favorito en esa vista, por eso agregué esta prop para controlar la visibilidad del icono de Favorito
      }));
      pokeData.results = newPokeData;
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

  const handlePokemonPress = (name: string, id: string, urlImg: string) => {
    // const arrayUrlPieces = urlId.split("/").filter(Boolean);
    // const id = arrayUrlPieces[arrayUrlPieces.length - 1];
    navigation.navigate("Pokemon", {
      name: name,
      id: id, // Ya paso directamente el id con su urlImg ya que ya saque el paraemtro id desde el inicio al recibir la respuesta de la Api
      urlImg: urlImg
    });
  };

  //Aquí agregue control de la vista del icono para Favoritos, ya que anteriormente faltaba que dependiendo si le dabas touch al icono este cambié dinamicamente para que el Usuario se de cuenta cuando esta guardado en Favoritos y cuando no.
  const handleSaveFavPokemon = (name: string, urlImg: string) => {
    setPokemons((prevState) =>
      prevState
        ? {
            ...prevState,
            results: prevState.results.map((p) => {
              if (p.name === name) {
                if (p.fav === false) {
                  //Esto lo deje igual porque si guardaba en el Array el problema era que la función la declaraba con otro nombre y por eso no se veía cuando los guardaba en el AsyncStorage.
                  const PokeObj = {
                    name: name,
                    urlImg: urlImg,
                    // pokemonImg: POKE_SERVER_IMGS[name], Ya no es necesario utilizar mi objeto de imágenes subidas a un servidor externo que las mostraba por name, ya que ahora las imágenes de los Pokemon se muestran directamente desde la PokeApi y no por name como lo hacía antes.
                  };
                  arrayPokemons.push(PokeObj);
                } else {
                  //Si el Pokemon ya estaba guardado en Favoritos y le das touch al icono de Favorito para quitarlo de Favoritos, entonces se filtra el Array para eliminarlo del AsyncStorage.
                  (async () => {
                    arrayPokemons = arrayPokemons.filter(
                      (p: any) => p.name !== name,
                    );
                  })();
                }

                (async () => {
                  await AsyncStorage.setItem(
                    "favorite_pokemons",
                    JSON.stringify(arrayPokemons),
                  );
                })();

                //Aquí agregue control de la vista del icono para Favoritos, ya que anteriormente faltaba que dependiendo si le dabas touch al icono este cambié dinamicamente para que el Usuario se de cuenta cuando esta guardado en Favoritos y cuando no.
                return {
                  ...p,
                  fav: !p.fav,
                };
              }
              return p;
            }),
          }
        : null,
    );
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text style={styles.welcomeText}>Welcome</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 30,
            marginRight: 10,
          }}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Text>Favorites</Text>
        </TouchableOpacity>
      </View>
      {pokemons ? (
        <FlatList
          style={{ marginBottom: 20 }}
          data={pokemons.results}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PokeCard
              {...item}
              handlePress={() => handlePokemonPress(item.name, item.id, item.urlImg)}
              handleSaveFavPokemon={() => handleSaveFavPokemon(item.name, item.urlImg)}
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
    paddingVertical: Platform.OS === "ios" ? 50 : 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Home;
