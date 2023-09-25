import { setItem } from "../utils/localStorage";
import {
  GET_POKEMONS_SUCCESS,
  GET_POKEMONS_REQUEST,
  GET_POKEMON_DATA_REQUEST,
  GET_POKEMON_DATA_SUCCESS,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  TOGGLE_MENU,
} from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POKEMONS_REQUEST: {
      const { pokemonsList } = payload;
      const { isLoading } = pokemonsList;
      return {
        ...state,
        pokemonsList: {
          ...pokemonsList,
          isLoading,
        },
      };
    }
    case GET_POKEMONS_SUCCESS:
      const { pokemonsList, generation = 1 } = payload;
      const key = `pokemons-${generation}`;
      setItem(key, pokemonsList && pokemonsList.list);
      return {
        ...state,
        pokemonsList,
      };
    case GET_POKEMON_DATA_REQUEST:
    case GET_POKEMON_DATA_SUCCESS:
      const { pokemonSelected } = payload;
      return {
        ...state,
        pokemonSelected,
      };
    case ADD_TO_FAVOURITES:
    case REMOVE_FROM_FAVOURITES:
      const { favourites } = payload;
      setItem("pokemons-favourites", favourites);
      return {
        ...state,
        favourites,
      };
    case TOGGLE_MENU:
      const { toggleMenu } = payload;
      return {
        ...state,
        toggleMenu,
      };
    default:
      return state;
  }
};
