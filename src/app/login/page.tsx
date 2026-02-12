'use client';
export const dynamic = "force-dynamic";

import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { authenticate } from '../lib/actions';
import styles from './login.module.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/product-list' || '/about-list';
    const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
    return (
        <div>
            <h1 className={poppins.className}>Login</h1>
            <form action={formAction} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor='email'>Email: </label>
                    <input type="email" placeholder="Email" autoComplete='email' autoFocus id='email' required/>
                </div>
                <div className={styles.field}>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" placeholder="Password" id='password'required minLength={8}/>
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <button type="submit" className={`${poppins.className} ${styles.complete}`} aria-disabled={isPending}>Login</button>
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