'use client'
import { useActionState } from 'react'
import { signup } from '@/auth'
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

  const [state, formAction, pending] =
    useActionState(signup, undefined)

  return (
    <div>
      <form action={formAction} className={styles.form}>
        <h1 className={poppins.className}>Signup</h1>
        <div className={styles.field}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            id='name'
            required
            defaultValue={state?.values?.name}
          />
          {/* {state?.errors?.name && <p className={styles.errorMessage}>{state.errors.name}</p>} */}
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            id='email'
            required
            defaultValue={state?.values?.email}

          />
          {/* {state?.errors?.email && <p className={styles.errorMessage}>{state.errors.email}</p>} */}
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
        {/*@ts-ignore */}
        {state?.errors?.password && (
          <div>
            <ul>
              {/*@ts-ignore*/}
              {state.errors.password.map((error) => (
                <li  className={styles.errorMessage} key={error}>❌ {error}</li>
              ))}
            </ul>
          </div>
        )}
        </div>

        <input
          type="hidden"
          name="redirectTo"
          value={callbackUrl}
        />
        {/*@ts-ignore*/}
        {state?.errors?.general?.map((err) => ( <p key={err} className={styles.errorMessage}>❌ {err}</p> ))}


        <button
          type="submit"
          className={`${poppins.className} ${styles.complete}`}
          disabled={pending}
        >
          Sign Up
        </button>

      </form>
    </div>
  )
}
