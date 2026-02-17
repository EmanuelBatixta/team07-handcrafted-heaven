"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './components.module.css';

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        
        { }
        <div className={styles.mainNavLinks}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.activeLink : ''}`}
          >
            Home
          </Link>
          
          <Link 
            href="/product-list" 
            className={`${styles.navLink} ${pathname?.startsWith('/product-list') ? styles.activeLink : ''}`}
          >
            Products
          </Link>
          
          <Link 
            href="/about-us" 
            className={`${styles.navLink} ${pathname === '/about-us' ? styles.activeLink : ''}`}
          >
            About Us
          </Link>
        </div>

        {/* Links de Login/Signup (Visíveis APENAS no Celular) */}
        <div className={styles.mobileAuthLinks}>
          <Link href="/login" className={styles.loginBtn}>Login</Link>
          <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
        </div>

      </nav>
    </div>
  );
}