import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen">
      <div className="container mx-auto flex h-full flex-col items-center gap-y-6 py-6">
        <h1 className="text-xl font-bold">Pokemon API App</h1>
        {children}
      </div>
    </div>
  )
}
