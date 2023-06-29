import { FirebaseAuth } from '@/setup/firebase/config'
import {
  User,
  signInWithEmailAndPassword,
  signOut as signOutFirebase
} from 'firebase/auth'

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
  } catch (error: any) {
    console.error('There was an error: ', error)
    throw new Error(error.message)
  }
}

export const signOut = async () => {
  try {
    await signOutFirebase(FirebaseAuth)
  } catch (error: any) {
    console.error('There was an error: ', error)
    throw new Error(error.message)
  }
}
