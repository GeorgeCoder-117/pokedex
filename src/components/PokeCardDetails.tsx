import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { POKE_LOCAL_IMGS, POKE_SERVER_IMGS } from "@/constants/pokeImages";

import { PokemonFeatures } from "@/services/pokeService";

type PokeCardDetailsProps = PokemonFeatures & { name: string };

const PokeCardDetails = ({ name, ...pokemon }: PokeCardDetailsProps) => {
  return (
      <LinearGradient
        colors={["#3165AE", "#FFFFFF"]} // Colores del gradiente
        start={{ x: 0.02, y: 1 }} // Punto inicial (esquina superior izquierda)
        end={{ x: 2, y: 1 }} // Punto final (esquina inferior derecha)
        style={styles.cardPokemon}
      >
        <Image
          style={styles.headerImage}
          source={require("../../assets/img/pokemonLogo.webp")}
          placeholder={"pokemon"}
          contentFit="cover"
          transition={200}
          cachePolicy="disk"
        />
        <Image
          style={styles.pokeImage}
          source={{ uri: POKE_SERVER_IMGS[name] }}
          placeholder={POKE_LOCAL_IMGS[name]}
          contentFit="cover"
          transition={200}
          cachePolicy="disk"
        />
        <View style={styles.cardPokemonBody}>
          <Text style={styles.titleInfo}>Information</Text>
          <View style={styles.pokemonEasyData}>
            <View style={styles.column}>
              <Text style={styles.txtEasyData}>Height</Text>
              <Text style={styles.txtEasyDataValue}>{pokemon?.height}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.txtEasyData}>Weight</Text>
              <Text style={styles.txtEasyDataValue}>{pokemon?.weight}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.txtEasyData}>Exp</Text>
              <Text style={styles.txtEasyDataValue}>
                {pokemon?.base_experience}
              </Text>
            </View>
          </View>

          <Text style={styles.titleTypes}>Types</Text>
          <View style={styles.pokemonTypesData}>
            {pokemon?.types.map((t, k) => (
              <View style={styles.column} key={k}>
                <Text style={styles.txtTypeValue}>{t.type.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.pokemonStatsData}>
            {pokemon?.stats.map((s, k) => (
              <View style={styles.column} key={k}>
                <Text style={styles.txtStat}>{s.stat.name}</Text>
                <Text style={styles.txtStatValue}>{s.base_stat}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.titleSkills}>Skills</Text>
          <View style={styles.pokemonSkillsData}>
            {pokemon?.abilities.map((a, k) => (
              <View style={styles.column} key={k}>
                <Text style={styles.txtSkillValue}>{a.ability.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
      cardPokemon: {
    flexDirection: "column",
    borderRadius: 20,
  },
  headerImage: {
    width: "auto",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  pokeImage: {
    width: "auto",
    height: 250,
  },

  cardPokemonBody: {
    padding: 20,
  },

  titleInfo: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  pokemonEasyData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  txtEasyData: {
    fontSize: 16,
    fontWeight: "500",
    // lineHeight: 18,
    color: "#fff",
  },
  txtEasyDataValue: {
    fontSize: 16,
    fontWeight: "600",
  },

  titleTypes: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginTop: 20,
    marginBottom: 5,
  },
  pokemonTypesData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: 10,
  },
  txtTypeValue: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  pokemonStatsData: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: 10,
    marginTop: 20,
  },
  txtStat: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textTransform: "capitalize",
  },
  txtStatValue: {
    fontSize: 16,
    fontWeight: "600",
  },

  titleSkills: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginTop: 20,
    marginBottom: 5,
  },
  pokemonSkillsData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: 10,
  },
  txtSkillValue: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

export default PokeCardDetails;
