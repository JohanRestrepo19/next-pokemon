import { FirebaseAuth } from '@/setup/firebase/config'
import { User, signInWithEmailAndPassword } from 'firebase/auth'

export const signIn = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )
    return userCredential.user
  } catch (error) {
    console.error('There was an error: ', error)
  }
}
