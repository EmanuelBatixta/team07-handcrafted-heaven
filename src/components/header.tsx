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
                <Image src="/handcraftedlogo.webp" alt="logo" width={70}height={70}></Image>    
                <h1 className={poppins.className}>Group 07</h1>
            </div>
            <div className={styles.buttons}>
                <button className={styles.fullfill}>Login</button>
                <button className={styles.outline}>Signup</button>
            </div>
        </header>
    )
}