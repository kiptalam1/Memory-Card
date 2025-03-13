import { useState, useEffect } from "react";

import FetchPokemons from "./PokemonCard";
import '../Styles/PokemonData.css';


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, SetBestScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState(new Set());
    
  useEffect(() => {
      const fetchImages = async () => {
          try {
              const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
              const data = await response.json();
              
              // fetch pokemon images from urls.
              const pokemonDetails = await Promise.all(
                  data.results.map(async (poke) => {
                      const res = await fetch(poke.url);
                      const details = await res.json();
                      return {
                          id: details.id,
                          name: poke.name,
                          image: details.sprites.front_default,
                      };
                  })
              );
              
              setPokemon(pokemonDetails);
          }catch (error) {
              console.log("Error fetching data:", error)
          }
          };
          fetchImages();
      }, []);

  return (
    <>
      <FetchPokemons />
    </>
  )
}

export default App
