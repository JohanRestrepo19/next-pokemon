import Head from 'next/head'
import Link from 'next/link'
import { AuthLayout } from '@/layouts/auth/Auth'
import { useForm } from '@/hooks/useForm'

import type { FormEvent, ReactNode } from 'react'
import type { NextPageWithLayout } from '../_app'

const SignUpPage: NextPageWithLayout = () => {
  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const res = await fetch('/api/login', {
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json', Authorization: '' },
      method: 'POST'
    })
    const data = await res.json()
    console.log('Server response: ', data)
  }

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
            name="email"
            value={email}
            onChange={onInputChange}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-bordered input w-full max-w-xs"
            name="password"
            value={password}
            onChange={onInputChange}
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

export default SignUpPage
