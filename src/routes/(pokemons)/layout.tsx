import { Slot, component$ } from "@builder.io/qwik";
import Navbar from "~/components/shared/navbar/Navbar";
import { PokemonProvider } from "~/context";

export default component$(() => {
  return (
    <PokemonProvider>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </PokemonProvider>
  );
});
