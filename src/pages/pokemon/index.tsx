import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { AuthAction, withAuthUser } from 'next-firebase-auth'
import { PokemonLayout } from '@/layouts/pokemon/Pokemon'
import { PokemonGrid } from '@/components/pokemon'

import type { PokemonMetaData } from '@/common/types'
import type { NextPageWithLayout } from '../_app'

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

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const PokemonPage: NextPageWithLayout<Props> = ({ pokemons }) => {
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

export default withAuthUser<Props>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(PokemonPage)
