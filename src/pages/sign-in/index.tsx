import Link from 'next/link'
import { AuthLayout } from '@/layouts/auth/Auth'
import type { ReactNode } from 'react'
import type { NextPageWithLayout } from '../_app'

const SignInPage: NextPageWithLayout = () => {
  return (
    <div className="card w-96 bg-neutral shadow-2xl shadow-neutral">
      <div className="card-body gap-y-4">
        <h2 className="card-title">Sign In</h2>

        <input
          type="text"
          placeholder="Email "
          className="input-bordered input w-full max-w-xs"
        />

        <input
          type="password"
          placeholder="Password "
          className="input-bordered input w-full max-w-xs"
        />

        <div className="card-actions flex-col items-center justify-center">
          <button className="btn-primary btn-wide btn">Login</button>
          <p className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href={'/sign-up'} className="text-secondary hover:underline">
              Sing up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

SignInPage.getLayout = (page: ReactNode) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignInPage
