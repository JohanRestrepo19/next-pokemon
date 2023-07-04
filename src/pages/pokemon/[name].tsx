import { ReactElement, useMemo, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { AuthAction, withAuthUser } from 'next-firebase-auth'

import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { PokemonLayout } from '@/layouts/pokemon/Pokemon'
import { NextPageWithLayout } from '../_app'

import type { Pokemon } from '@/common/types'

const PokemonDetails: NextPageWithLayout<{}> = () => {
  const router = useRouter()

  const pokemonQuery = useQuery({
    queryKey: ['pokmeon', router.query.name],
    queryFn: async (): Promise<Pokemon> => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${router.query.name}`
      )
      const pokemon: Pokemon = await res.json()
      return pokemon
    }
  })

  const [isImgHovered, setIsImgHovered] = useState<boolean>(false)

  const imgSrc: string = useMemo(() => {
    if (!isImgHovered)
      return (
        pokemonQuery.data?.sprites.other?.['official-artwork'].front_default ||
        ''
      )
    return pokemonQuery.data?.sprites.other?.dream_world.front_default || ''
  }, [isImgHovered, pokemonQuery.data])

  if (pokemonQuery.isLoading) return <h1>Loading info...</h1>
  if (pokemonQuery.isError) return <h1>There was an error</h1>

  return (
    <>
      <Head>
        <title>{`${pokemonQuery.data?.name} Info`}</title>
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
            <h2 className="card-title capitalize">{pokemonQuery.data?.name}</h2>
            <div>
              <p className="font-semibold">Abilities: </p>
              <ul className="list-disc">
                {pokemonQuery.data?.abilities.map(ability => (
                  <li className="ml-8" key={ability.ability.name}>
                    {ability.ability.name}
                  </li>
                ))}
              </ul>

              <br />

              <p>
                <strong>Base experience: </strong>
                {pokemonQuery.data?.base_experience}
              </p>

              <br />

              {/*Stats*/}
              <p className="font-semibold">Stats: </p>
              <ul className="list-disc">
                {pokemonQuery.data?.stats.map(stat => (
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

export default withAuthUser<{}>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(PokemonDetails)
