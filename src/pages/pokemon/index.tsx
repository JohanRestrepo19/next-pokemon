import { PokemonMetaData } from '@/common/types'
import { PokemonGrid } from '@/components/pokemon'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

type EndpointResponse = {
  count: number
  next: string | null
  previous: string | null
  results: PokemonMetaData[] | null
}

export const getServerSideProps: GetServerSideProps<{
  pokemons: PokemonMetaData[]
}> = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
  const data: EndpointResponse = await res.json()
  return { props: { pokemons: data.results || [] } }
}

export default function PokemonPage({
  pokemons
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
