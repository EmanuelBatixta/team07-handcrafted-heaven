import Link from 'next/link'
import styles from './components.module.css'

export default function Nav(){
    return( 
        <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/product-list">Products</Link>
            <Link href="/about-us">About Us</Link>
        </nav>
    )
}