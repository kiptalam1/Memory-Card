import { useState, useEffect } from "react";

import '../Styles/PokemonData.css';
import PokemonContainer from "./PokemonGrid";
import ScoreBoard from "./ScoreBoard";


function App() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState(new Set());

  function resetScores () {
    setScore(0);
    setBestScore(0);
    setClickedPokemon(new Set());
  }
    
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

      // to shuffle cards when card is clicled.
      const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
      };

      // handle scores when card is clicked.
      function handleClick (id) {
        // if pokemon is clicked twice.
        if (clickedPokemon.has(id)) {
          setScore(0);
          setClickedPokemon(new Set());
        }
        else {
          setScore((prev) => {
            const newScore = prev + 1;
            setBestScore((prevBest) => Math.max(prevBest, newScore));
            return newScore;
          });

          setClickedPokemon((prev) => new Set([...prev, id])); 
        }

        setPokemon(shuffleArray([...pokemon]));
      };

  return (
    <>
    <ScoreBoard score={score} bestScore={bestScore} resetScores={resetScores}/>
      <PokemonContainer pokemon={pokemon} handleClick={handleClick} />
    </>
  )
}

export default App
