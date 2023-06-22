import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">Pokemon API</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/pokemon">Pokemon list</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
