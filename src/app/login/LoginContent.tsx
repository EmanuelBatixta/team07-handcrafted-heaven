'use client'

import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'
import { authenticate } from '../lib/actions'
import styles from './login.module.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
})

export default function LoginContent() {
  const searchParams = useSearchParams()
  const callbackUrl =
    searchParams.get('callbackUrl') || '/product-list'

  const [errorMessage, formAction, pending] =
    useActionState(authenticate, undefined)

  return (
    <div>

      <form action={formAction} className={styles.form}>
        <h1 className={poppins.className}>Login</h1>
        <div className={styles.field}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            id='email'
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id='password'
            required
            minLength={8}
          />
        </div>

        <input
          type="hidden"
          name="redirectTo"
          value={callbackUrl}
        />

        <button
          type="submit"
          className={`${poppins.className} ${styles.complete}`}
          aria-disabled={pending}
        >
          Login
        </button>

        {errorMessage && (
          <p className={styles.errorMessage}>
            ❌ {errorMessage}
          </p>
        )}
      </form>
    </div>
  )
}