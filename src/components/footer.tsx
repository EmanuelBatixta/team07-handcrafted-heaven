import Image from "next/image"
import Link from 'next/link'
import styles from './components.module.css'

export default function Footer() {
    return (
        <>
            <div className={styles.footerContainer}>
                <nav className={styles.footerNav} >
                    <Link href="/">Home</Link>
                    <Link href="/product-list">Products</Link>
                    <Link href="/about-us">About Us</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </nav >


                <div className={styles.footerTitle}>
                    <h1 className={styles.footer}>Handcrafted Heaven</h1>
                    <Image className="logoFooter" src="/handcraftedlogo.webp" alt="logoFooter" width={100} height={100}></Image>
                </div>

                <div className={styles.studentsList}>
                    <p>Members:</p>
                    <ul>
                        <li>Alex C.</li>
                        <li>Emanuel Batista</li>
                        <li>John Carlo D.</li>
                        <li>John Carlo D.</li>
                        <li>John Carlo D.</li>
                    </ul>
                </div>

                <span className={styles.copyright}>©{new Date().getFullYear()} All rigths reserved</span>
            </div>
        </>
    )
}