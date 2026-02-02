import styles from './signup.module.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Signup() {
    return (
        <div>
            <h1 className={poppins.className}>Signup</h1>
            <form action="#" className={styles.form}>
                <div className={styles.field}>
                    <label>Full Name: </label>
                    <input type="text" placeholder="Name" />
                </div>
                <div className={styles.field}>
                    <label>Email: </label>
                    <input type="email" placeholder="Email" />
                </div>
                <div className={styles.field}>
                    <label>Password: </label>
                    <input type="password" placeholder="Password" />
                </div>
                <button type="submit" className={`${poppins.className} ${styles.complete}`}>Login</button>
            </form>
        </div>
    );
}