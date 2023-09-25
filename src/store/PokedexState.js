import React, { useReducer } from "react";
import PokedexReducer from "./PokedexReducer";
import PokedexContext from "./PokedexContext";
import {
  GET_POKEMONS_REQUEST,
  GET_POKEMONS_SUCCESS,
  GET_POKEMON_DATA_REQUEST,
  GET_POKEMON_DATA_SUCCESS,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  TOGGLE_MENU,
} from "./types";
import { getItems } from "../utils/localStorage";

const PokedexState = (props) => {
  const initState = {
    pokemonsList: {
      list: [],
      isLoading: true,
    },
    pokemonSelected: {
      pokemonData: {},
      isLoading: true,
    },
    favourites: getItems("pokemons-favourites"),
    toggleMenu: false,
  };

  const [state, dispatch] = useReducer(PokedexReducer, initState);

  const getPokemons = async (generation) => {
    if (!generation) generation = 1;
    const pokemonsList = getItems(`pokemons-${generation}`);

    if (pokemonsList.length) {
      dispatch({
        type: GET_POKEMONS_SUCCESS,
        payload: {
          pokemonsList: {
            isLoading: false,
            list: pokemonsList,
          },
          generation,
        },
      });
      return false;
    }

    try {
      dispatch({
        type: GET_POKEMONS_REQUEST,
        payload: {
          pokemonsList: {
            isLoading: true,
          },
        },
      });
      await fetch(
        `https://gabrielcarnez.com.ar/pokemons.php?generation=${generation}`
      )
        .then((response) => response.json())
        .then((poke) => {
          dispatch({
            type: GET_POKEMONS_SUCCESS,
            payload: {
              pokemonsList: {
                list: poke,
                isLoading: false,
              },
              generation,
            },
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonData = async (id) => {
    const pokemonsList = getItems("pokemons-favourites");

    if (pokemonsList.length) {
      const pokemonData = pokemonsList.find((p) => p["id"] === parseInt(id));
      if (pokemonData) {
        dispatch({
          type: GET_POKEMON_DATA_SUCCESS,
          payload: {
            pokemonSelected: {
              pokemonData,
              isLoading: false,
            },
          },
        });
        return false;
      }
    }

    try {
      dispatch({
        type: GET_POKEMON_DATA_REQUEST,
        payload: {
          pokemonSelected: {
            pokemonData: {},
            isLoading: true,
          },
        },
      });
      await fetch(`http://gabrielcarnez.com.ar/pokemons.php?id=${id}`)
        .then((response) => response.json())
        .then((pokemon) => {
          dispatch({
            type: GET_POKEMON_DATA_SUCCESS,
            payload: {
              pokemonSelected: {
                pokemonData: pokemon,
                isLoading: false,
              },
            },
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const addToFavourites = (pokeData) => {
    const { favourites } = state;
    if (favourites.findIndex((p) => p["id"] === pokeData["id"]) === -1) {
      favourites.push(pokeData);
      dispatch({
        type: ADD_TO_FAVOURITES,
        payload: { favourites },
      });
    }
  };

  const removeFronFavourites = (pokeData) => {
    const { favourites } = state;
    const pokeIndex = favourites.findIndex((p) => p["id"] === pokeData["id"]);
    if (pokeIndex !== -1) {
      favourites.splice(pokeIndex, 1);
      dispatch({
        type: REMOVE_FROM_FAVOURITES,
        payload: { favourites },
      });
    }
  };

  const toggleMenu = () => {
    dispatch({
      type: TOGGLE_MENU,
      payload: { toggleMenu: !state.toggleMenu },
    });
  };

  return (
    <PokedexContext.Provider
      value={{
        pokemonsList: {
          ...state.pokemonsList,
          getPokemons,
        },
        pokemonSelected: {
          ...state.pokemonSelected,
          getPokemonData,
        },
        favourites: {
          addToFavourites,
          removeFronFavourites,
          favourites: state.favourites,
        },
        menu: {
          showMenu: state.toggleMenu,
          toggleMenu,
        },
      }}
    >
      {props.children}
    </PokedexContext.Provider>
  );
};

export default PokedexState;
