import Head from 'next/head'
import Link from 'next/link'
import { AuthLayout } from '@/layouts/auth/Auth'

import type { ReactNode } from 'react'
import type { NextPageWithLayout } from '../_app'
import { AuthAction, withAuthUser } from 'next-firebase-auth'

const SignUpPage: NextPageWithLayout = () => {
  const handleSubmit = () => {}

  return (
    <>
      <Head>
        <title>Pokemon API Sign up</title>
      </Head>

      <div className="card w-96 bg-neutral shadow-2xl shadow-neutral">
        <form className="card-body gap-y-4" onSubmit={handleSubmit}>
          <h2 className="card-title">Sign Up</h2>

          <input
            type="text"
            placeholder="Email"
            className="input-bordered input w-full max-w-xs"
          />

          <input
            type="password"
            placeholder="Password"
            className="input-bordered input w-full max-w-xs"
          />

          <div className="card-actions flex-col items-center justify-center">
            <button className="btn-primary btn-wide btn">Register</button>
            <p className="text-center text-sm">
              Already have an account?{' '}
              <Link
                href={'/sign-in'}
                className="text-secondary hover:underline"
              >
                Sing in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

SignUpPage.getLayout = (page: ReactNode) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default withAuthUser<{}>({ whenAuthed: AuthAction.REDIRECT_TO_APP })(
  SignUpPage
)
