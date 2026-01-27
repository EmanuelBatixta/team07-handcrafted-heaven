import Image from "next/image"
import styles from './components.module.css'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image src="/handcraftedlogo.webp" alt="logo" width={200}height={200}></Image>    
                <h1 className={poppins.className}>Group 07</h1>
            </div>
            <div className={styles.buttons}>
                <button>Login</button>
                <button>Signup</button>
            </div>
        </header>
    )
}