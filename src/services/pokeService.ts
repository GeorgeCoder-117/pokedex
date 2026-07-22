import apiClient from "./apiClient";

// Interface para error personalizado del interceptor
export interface ApiError {
  message: string;
  status: number | null;
}

interface Pokemon {
  name: string;
  url: string;
  id: string;
  urlImg: string;
  fav?: boolean; // Agregamos la propiedad opcional "fav" para indicar si es favorito
  showFavIcon?: boolean; // Agregamos la propiedad opcional "showFavIcon" para controlar la visibilidad del icono de favorito
}

export interface Pokemons {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
}

interface PokemonTypeDetails {
  name: string;
  url: string;
}

interface PokemonType {
  slot: number;
  type: PokemonTypeDetails;
}

interface PokemonStatDetails {
  name: string;
  url: string;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat : PokemonStatDetails;
}

interface PokemonSkillDetails {
  name: string;
  url: string;
}

interface PokemonSkill {
  ability : PokemonSkillDetails;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonFeatures {
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonSkill[]
}

// Si interceptor falla. Promesas contenidas en el servicio se rechazarán automáticamente.
export const PokeService = {
  getPokemons: async (): Promise<Pokemons> => {
    const response = await apiClient.get<Pokemons>(`/pokemon?offset=0&limit=20`);
    return response.data;
  },
  getPokemonFeatures: async (id: string) : Promise<PokemonFeatures> => {
    const response = await apiClient.get<PokemonFeatures>(`/pokemon/${id}`);
    return response.data;
  },
};
