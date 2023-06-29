import { signOut } from '@/services/firebase/auth'
import Link from 'next/link'

const handleSignOut = async () => {
  await signOut()
  await fetch('/api/logout', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

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
          <li>
            <a onClick={handleSignOut}>Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
