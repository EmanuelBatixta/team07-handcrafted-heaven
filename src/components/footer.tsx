import Image from "next/image"
import Link from 'next/link'
import styles from './components.module.css' // Importando o CSS correto

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                
                
                <div className={styles.brandColumn}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <Image 
                            src="/handcraftedlogo.webp" 
                            alt="Logo" 
                            width={200} 
                            height={200} 
                        />
                        <h1 className={styles.logoTitle}>Handcrafted Heaven</h1>
                    </div>
                    <p className={styles.brandText}>
                        Handmade products crafted with dedication and quality to make your life more special.
                    </p>
                </div>
 
                <div>
                    <h3 className={styles.columnTitle}>Navigation</h3>
                    <nav className={styles.linkList}>
                        <Link href="/">Home</Link>
                        <Link href="/product-list">Products</Link>
                        <Link href="/about-us">About Us</Link>
                        <Link href="/login">Login</Link>
                    </nav>
                </div>

                <div>
                    <h3 className={styles.columnTitle}>Members</h3>
                    <ul className={styles.linkList}>
                        <li><span>Alex Condori</span></li>
                        <li><span>Emanuel Batista</span></li>
                        <li><span>John Carlo D.</span></li>
                    </ul>
                </div>


                <div>
                    <h3 className={styles.columnTitle}>&nbsp;</h3>
                    <ul className={styles.linkList}>
                        <li><span>Tyson Pace</span></li>
                        <li><span>Jonathas Oliveira</span></li>
                        <li><span>Ibraim Vergara</span></li>
                    </ul>
                </div>
            </div>


            <div className={styles.bottomBar}>
                <span>© {new Date().getFullYear()} Handcrafted Heaven. All rights reserved.</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <span>Terms</span>
                    <span>Privacy</span>
                </div>
            </div>
        </footer>
    )
}