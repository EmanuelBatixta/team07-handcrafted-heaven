import Image from "next/image"
import Link from 'next/link'
import styles from './app.module.css'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div>
      <h1 className={poppins.className}>Home</h1>

      <div className={styles.container}>
        <div className={styles.row}>
          <h2>Welcome to Handcrafted Haven</h2>
          <p>Handcrafted Haven is a platform for artisans and crafters to showcase their unique handcrafted items and sell them to potential customers.</p>
          <p>View our <Link href="/product-list">products</Link> and place an order today!</p>
        </div>
          <Image className={`${styles.row} ${styles.picture}`} src="/hand-crafted-image.jpg" alt="logo" width={612} height={408}></Image>
      </div>
    </div>
  );
}
