'use client'
import { useActionState } from 'react';
import { signup } from '../lib/actions';
import styles from './signup.module.css';
import { Poppins } from 'next/font/google';
import { useSearchParams } from 'next/navigation';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Signup() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/prodcut-list';
    const [errorMessage, formAction, isPending] = useActionState(
    signup,
    undefined,
)

    return (
        <div>
            <h1 className={poppins.className}>Signup</h1>
            <form action={formAction} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor='name'>Full Name: </label>
                    <input type="text" placeholder="Name" id='name' autoFocus autoComplete='name'required/>
                </div>
                <div className={styles.field}>
                    <label htmlFor='email'>Email: </label>
                    <input type="email" placeholder="Email" id='email' autoComplete='email'required/>
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" placeholder="Password" id='password' required minLength={8}/>
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <button type="submit" className={`${poppins.className} ${styles.complete}`}>Login</button>
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    >
                    {errorMessage && (
                        <>
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}