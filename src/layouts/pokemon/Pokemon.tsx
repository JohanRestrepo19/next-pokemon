import { ReactNode } from 'react'
import { Navbar } from './components/Navbar'

type Props = {
  children: ReactNode
}

export const PokemonLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6">{children}</div>
    </>
  )
}
