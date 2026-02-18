import Link from 'next/link';
import Image from 'next/image';
import styles from './components.module.css';
import { verifySession } from '@/app/lib/dal';
import { logout } from '@/auth';

export default async function Header() {
  const session = await verifySession();
  return (
    <header className={styles.header}>
      {/* Logo on the left */}
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
      
      {/* Action buttons on the right */}
      <div className={styles.headerActions}>
        {session?.isAuth ? (
          <>
            <p>Hello, {session.user?.name}</p>
            <form action={logout}>
              <button className={styles.logoutBtn}>Logout</button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className={styles.loginBtn}>Login</Link>
            <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
          </>
        )
       }
      </div>
    </header>
  );
}