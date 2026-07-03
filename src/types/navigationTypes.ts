import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Pokemon: { name: string; id: string };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type PokemonScreenProps = NativeStackScreenProps<RootStackParamList, "Pokemon">;