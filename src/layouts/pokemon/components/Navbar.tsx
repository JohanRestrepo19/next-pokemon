import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Pokemon</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/pokemon">Lista de pokemones</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
