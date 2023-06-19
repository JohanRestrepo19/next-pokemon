import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { PokemonGrid } from '@/components/pokemon'
import { PokemonMetaData } from '@/common/types'
import { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'
import { PokemonLayout } from '@/layouts/pokemon/Pokemon'

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

const PokemonPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ pokemons }) => {
  return (
    <>
      <Head>
        <title>Pokemon list</title>
      </Head>
      <div>
        <PokemonGrid pokemons={pokemons} />
      </div>
    </>
  )
}

PokemonPage.getLayout = function getLayout(page: ReactElement) {
  return <PokemonLayout>{page}</PokemonLayout>
}

export default PokemonPage
