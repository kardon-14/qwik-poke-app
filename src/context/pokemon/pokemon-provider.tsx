import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { PokemonGameContext } from "./pokemon-game.context";
import { PokemonListContext } from "./pokemon-list.context";
import type { PokemonGameState } from "./pokemon-game.context";
import type { PokemonListState } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    showBackImage: true,
    isPokemonVisible: false,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemons: [],
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    if (localStorage.getItem("pokemon-game")) {
      const {
        pokemonId = 10,
        showBackImage = false,
        isPokemonVisible = true,
      } = JSON.parse(localStorage.getItem("pokemon-game")!) as PokemonGameState;

      pokemonGame.isPokemonVisible = isPokemonVisible
      pokemonGame.pokemonId = pokemonId
      pokemonGame.showBackImage = showBackImage
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
      pokemonGame.isPokemonVisible,
    ]);

    localStorage.setItem("pokemon-game", JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
