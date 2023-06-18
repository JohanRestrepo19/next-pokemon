import { PokemonGrid } from '@/components/pokemon/PokemonGrid'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

export type PokemonData = {
  name: string
  url: string
}

type APIResponse = {
  count: number
  next: string | null
  previous: string | null
  results: PokemonData[] | null
}

export const getServerSideProps: GetServerSideProps<{
  pokemons: PokemonData[]
}> = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
  const data: APIResponse = await res.json()
  console.log('API response: ', data)
  return { props: { pokemons: data.results || [] } }
}

export default function PokemonPage({
  pokemons
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('Pokemon Data 🔥:', pokemons)
  return (
    <>
      <Head>
        <title>{'Pokemon list'}</title>
      </Head>

      <div>
        <h1>PokemonPage</h1>
        <PokemonGrid pokemons={pokemons} />
      </div>
      <Link href={'/'}>Home</Link>
    </>
  )
}
