import PokemonCard from "./PokemonCard.jsx";

export default function PokemonContainer ({pokemon, handleClick}) {
    return (
        <div className="child">
            <div className="pokemon-container">
                {pokemon.map((poke) => (
                    <PokemonCard key={poke.id} poke={poke} handleClick={handleClick}/>
                ))}
            </div>
        </div>
    )
}