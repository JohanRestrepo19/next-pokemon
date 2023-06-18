import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Hola mundo</h1>
      <Link href={'/pokemon'}>Pokemones</Link>
    </div>
  )
}
