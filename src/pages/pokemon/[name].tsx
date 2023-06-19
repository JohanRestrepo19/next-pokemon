//TODO: Search if it is better to use client-side-rendering.
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next'
import { NextPageWithLayout } from '../_app'
import { Pokemon } from '@/common/types'
import Image from 'next/image'
import { ReactElement } from 'react'
import { PokemonLayout } from '@/layouts/pokemon/Pokemon'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps<{
  pokemon: Pokemon
}> = async (ctx: GetServerSidePropsContext) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ctx.query.name}`)
  const data: Pokemon = await res.json()

  return { props: { pokemon: data } }
}

const PokemonDetails: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ pokemon }) => {
  console.log(pokemon)
  return (
    <section className="flex justify-center">
      <div className="card w-96 glass">
        <figure>
          <Image
            src={
              pokemon.sprites.other?.['official-artwork'].front_default || ''
            }
            width={250}
            height={250}
            alt="Picture of pokemon"
            priority
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title capitalize">{pokemon.name}</h2>
          <div>
            <p className="font-semibold">Habilidades: </p>
            <ul className="list-disc">
              {pokemon.abilities.map(ability => (
                <li className="ml-8" key={ability.ability.name}>
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-actions justify-center">
            <Link href="/pokemon" className="btn btn-primary">
              Volver
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

PokemonDetails.getLayout = function(page: ReactElement) {
  return <PokemonLayout>{page}</PokemonLayout>
}

export default PokemonDetails
