import Image from "next/image"
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
                <button className={`${styles.fullfill} ${poppins.className}`}>Login</button>
                <button className={`${styles.outline} ${poppins.className}`}>Signup</button>
            </div>
        </header>
    )
}