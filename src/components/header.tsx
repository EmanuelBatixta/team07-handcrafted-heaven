import Image from "next/image"
import Link from 'next/link'
import styles from './components.module.css'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image 
                    src="/handcraftedlogo.webp" 
                    alt="logo" 
                    width={140} 
                    height={140}
                    priority 
                />    
                <h1 className={poppins.className}>Group 07</h1>
            </div>
            <div className={styles.buttons}>
                <Link href="/login">
                    <button className={`${styles.fullfill} ${poppins.className}`}>Login</button>
                </Link>
                <Link href="/signup">
                    <button className={`${styles.outline} ${poppins.className}`}>Signup</button>
                </Link>
            </div>
        </header>
    )
}