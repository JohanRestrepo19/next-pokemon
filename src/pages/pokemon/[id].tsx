import { useRouter } from 'next/router'

export default function PokemonDetails() {
  const { query } = useRouter()
  return (
    <div>
      <h1>Pokemon info: {query.id}</h1>
    </div>
  )
}
