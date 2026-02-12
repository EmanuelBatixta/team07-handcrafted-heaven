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
    const callbackUrl = searchParams.get('callbackUrl') || '/login';
    const [state, action, pending] = useActionState(signup, undefined)
    return (
        <div>
            <form action={action} className={styles.form}>
                <h1 className={poppins.className}>Signup</h1>
                <div className={styles.field}>
                    <label htmlFor='name'>Full Name: </label>
                    <input type="text" placeholder="Name" id='name' autoFocus name='name' autoComplete='name'required/>
                </div>
                {/* {state?.errors?.name && <p>{state.errors.name}</p>} */}

                <div className={styles.field}>
                    <label htmlFor='email'>Email: </label>
                    <input type="email" placeholder="Email" id='email' name='email' autoComplete='email'required/>
                </div>
                {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}

                <div className={styles.field}>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" placeholder="Password" name='password' id='password' required minLength={8}/>
                </div>
                {/* {state?.errors?.password && (
                    <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                        <li key={error}>- {error}</li>
                        ))}
                    </ul>
                    </div>
                )} */}
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <button disabled={pending} type="submit" className={`${poppins.className} ${styles.complete}`}>Signup</button>
            </form>
        </div>
    );
}