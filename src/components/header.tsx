import Link from 'next/link';
import Image from 'next/image';
import styles from './components.module.css';
import { auth } from '@/auth';
import { signOut } from '@/auth';

export default async function Header() {
  const session = await auth().catch(() => null);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image 
          src="/handcrafted-haven-logo.png" 
          alt="Handcrafted Haven Logo" 
          width={100} 
          height={100} 
          style={{ borderRadius: '8px' }}
        />
        Handcrafted<span className={styles.logoHighlight}>Haven</span>
      </Link>
      
      <div className={styles.headerActions}>
        {session ? (
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit" className={styles.loginBtn}>
              Logout
            </button>
          </form>
        ) : (
          <>
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/signup" className={styles.signupBtn}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}