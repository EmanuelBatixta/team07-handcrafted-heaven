'use client'

import { useActionState } from 'react'
import { signup } from '../lib/actions'
import styles from './signup.module.css'
import { Poppins } from 'next/font/google'
import { useSearchParams } from 'next/navigation'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
})

export default function SignupContent() {
  const searchParams = useSearchParams()
  const callbackUrl =
    searchParams.get('callbackUrl') || '/product-list'

  const [errorMessage, formAction, isPending] =
    useActionState(signup, undefined)

  return (
    <div>
      <h1 className={poppins.className}>Signup</h1>

      <form action={formAction} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
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
          aria-disabled={isPending}
        >
          Signup
        </button>

        {errorMessage && (
          <p className="text-sm text-red-500">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  )
}
