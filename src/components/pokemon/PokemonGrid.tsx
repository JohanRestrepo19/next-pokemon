import { PokemonMetaData } from '@/common/types'

type Props = {
  pokemons: PokemonMetaData[]
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
