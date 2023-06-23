import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href={'/pokemon'}>Pokemones</Link>
      <Link href={'/sign-in'}>Login</Link>
      <Link href={'/sign-up'}>Sign up</Link>
    </div>
  )
}
