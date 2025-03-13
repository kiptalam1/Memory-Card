import PokemonCard from "./PokemonCard";

export default function PokemonContainer ({pokemon, handleClick}) {
    return (
        <div className="pokemon-container">
            {pokemon.map((poke) => {
                <PokemonCard poke={poke} handleClick={handleClick}/>
            })}
        </div>
    )
}