import { FormEvent, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { AuthLayout } from '@/layouts/auth/Auth'
import { useForm } from '@/hooks/useForm'
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth'
import { FirebaseApp } from '@/setup/firebase/config'

import type { ReactNode } from 'react'
import type { NextPageWithLayout } from '../_app'

const SignInPage: NextPageWithLayout = () => {
  const { email, password, handleInputChange } = useForm({
    email: '',
    password: ''
  })

  const authUser = useAuthUser()

  useEffect(() => {
    console.log('Authuser', authUser)
  }, [authUser])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const res = await fetch('/api/login', {
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'unauthenticated'
      },
      method: 'POST'
    })
    const data = await res.json()
    console.log('Server response: ', data)
  }

  return (
    <>
      <Head>
        <title>Pokemon API Sign in</title>
      </Head>

      <div className="card w-96 bg-neutral shadow-2xl shadow-neutral">
        <form className="card-body gap-y-4" onSubmit={handleSubmit}>
          <h2 className="card-title">Sign In</h2>

          <input
            type="email"
            placeholder="Email "
            className="input-bordered input w-full max-w-xs"
            name="email"
            value={email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            placeholder="Password "
            className="input-bordered input w-full max-w-xs"
            name="password"
            value={password}
            onChange={handleInputChange}
          />

          <div className="card-actions flex-col items-center justify-center">
            <button className="btn-primary btn-wide btn">Login</button>
            <p className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href={'/sign-up'}
                className="text-secondary hover:underline"
              >
                Sing up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}

SignInPage.getLayout = (page: ReactNode) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default withAuthUser<{}>({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedAfterInit: AuthAction.RENDER
})(SignInPage)
