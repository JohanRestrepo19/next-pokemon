import { PokemonMetaData } from '@/common/types'
import Link from 'next/link'

type Props = {
  pokemons: PokemonMetaData[]
}

export const PokemonGrid = ({ pokemons }: Props) => {
  return (
    <ul className="flex flex-wrap justify-center items-center gap-4">
      {pokemons.map(pokemon => (
        <li key={pokemon.name} className="card w-96 bg-primary-focus shadow-xl">
          <Link
            href={`/pokemon/${pokemon.name}`}
            className="card-body text-center text-primary-content"
          >
            {pokemon.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
