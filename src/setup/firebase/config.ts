import { getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export const FirebaseApp = getApp()
export const FirebaseAuth = getAuth(FirebaseApp)
