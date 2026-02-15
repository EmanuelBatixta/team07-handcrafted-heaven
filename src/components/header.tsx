import Image from "next/image"
import Link from 'next/link'
import styles from './components.module.css'
import { Poppins } from 'next/font/google';
import { logout } from "@/auth";
import { verifySession } from "@/app/lib/dal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default async function Header() {
    const session = await verifySession()
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
                {
                   session?.isAuth !== false ? (
                        <>
                            <p className={styles.userName}>Hello, {session?.user?.name}</p>
                            <form className={styles.signout}
                                action={logout}
                            >
                                
                                <button
                                type="submit"
                                className={`${poppins.className} ${styles.fullfill}`}
                                >
                                    LogOut
                                </button>
                            </form>
                        </>
                    ) : (

                        <>
                            <Link href="/login">
                            <button className={`${styles.fullfill} ${poppins.className}`} >Login</button>
                            </Link>
                            <Link href="/signup">
                                <button className={`${styles.outline} ${poppins.className}`}>Signup</button>
                            </Link>
                        </>
                    )
                }
            </div>
        </header>
    )
}
