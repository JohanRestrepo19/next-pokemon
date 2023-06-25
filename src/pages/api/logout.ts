import initAuth from '@/setup/firebase'
import { NextApiRequest, NextApiResponse } from 'next'
import { unsetAuthCookies } from 'next-firebase-auth'

initAuth()

type Data = {
  success: boolean
  error?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await unsetAuthCookies(req, res)
  } catch (error) {
    return res.status(500).json({ error: 'Unexpected error.', success: false })
  }
  return res.status(200).json({ success: true })
}

export default handler
