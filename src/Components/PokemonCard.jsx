export default function PokemonCard ({poke, handleClick}) {
    return (
    <div className="pokemon-card" onClick={() => handleClick(poke.id)}>
        <img src={poke.image} alt={poke.name} />
        <p>{poke.name}</p>
    </div>
    );
}