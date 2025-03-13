import { useState, useEffect } from "react";

export default function FetchPokemons () {
    const [pokemon, setPokemon] = useState([]);
    
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
                const data = await response.json();
                
                // fetch pokemons images from urls.
                const pokemonDetails = await Promise.all(
                    data.results.map(async (poke) => {
                        const res = await fetch(poke.url);
                        const details = await res.json();
                        return {
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

        if (!pokemon) return <p>Loading...</p>

        return (
            <div className="pokemon-container">
                {pokemon.map((poke, index) => (
                    <div key={index} className="pokemon">
                        <img src={poke.image} alt={poke.name}/>
                        <p>{poke.name}</p>
                    </div>
                ))}
                
            </div>
        );
}