import { PokemonData } from '@/pages/pokemon'

type Props = {
  pokemons: PokemonData[]
}

export const PokemonGrid = ({ pokemons }: Props) => {
  return (
    <ul>
      {pokemons.map(pokemon => (
        <li key={pokemon.name}>Pokemon name: {pokemon.name}</li>
      ))}
    </ul>
  )
}
