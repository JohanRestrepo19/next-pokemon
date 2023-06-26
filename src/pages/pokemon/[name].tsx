import { ReactElement, useMemo, useState } from 'react'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PokemonLayout } from '@/layouts/pokemon/Pokemon'
import { NextPageWithLayout } from '../_app'
import { Pokemon } from '@/common/types'
import Head from 'next/head'
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR
} from 'next-firebase-auth'

//TODO: Search if it is better to use client-side-rendering.
export const getServerSideProps: GetServerSideProps<{
  pokemon: Pokemon
}> = withAuthUserTokenSSR()(async (ctx: GetServerSidePropsContext) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ctx.query.name}`)
  const data: Pokemon = await res.json()
  return { props: { pokemon: data } }
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const PokemonDetails: NextPageWithLayout<Props> = ({ pokemon }) => {
  const [isImgHovered, setIsImgHovered] = useState<boolean>(false)

  const imgSrc: string = useMemo(() => {
    if (!isImgHovered)
      return pokemon.sprites.other?.['official-artwork'].front_default || ''
    return pokemon.sprites.other?.dream_world.front_default || ''
  }, [isImgHovered, pokemon])

  return (
    <>
      <Head>
        <title>{`${pokemon.name} Info`}</title>
      </Head>
      <section className="flex justify-center">
        <div className="card glass w-96 shadow-2xl">
          <figure className="relative h-64">
            <Image
              src={imgSrc}
              className="h-auto w-auto scale-95 duration-300 ease-in-out hover:scale-100"
              width={250}
              height={250}
              alt="Picture of pokemon"
              placeholder="blur"
              blurDataURL={imgSrc}
              onMouseEnter={() => setIsImgHovered(true)}
              onMouseLeave={() => setIsImgHovered(false)}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title capitalize">{pokemon.name}</h2>
            <div>
              <p className="font-semibold">Abilities: </p>
              <ul className="list-disc">
                {pokemon.abilities.map(ability => (
                  <li className="ml-8" key={ability.ability.name}>
                    {ability.ability.name}
                  </li>
                ))}
              </ul>

              <br />

              <p>
                <strong>Base experience: </strong>
                {pokemon.base_experience}
              </p>

              <br />

              {/*Stats*/}
              <p className="font-semibold">Stats: </p>
              <ul className="list-disc">
                {pokemon.stats.map(stat => (
                  <li className="ml-8" key={stat.stat.name}>
                    <strong>{stat.stat.name}:</strong> {stat.base_stat} -
                    <strong>Effort:</strong> {stat.effort}
                  </li>
                ))}
              </ul>
            </div>

            <br />

            <div className="card-actions justify-center">
              <Link href="/pokemon" className="btn-primary btn">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

PokemonDetails.getLayout = function (page: ReactElement) {
  return <PokemonLayout>{page}</PokemonLayout>
}

export default withAuthUser<Props>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(PokemonDetails)
