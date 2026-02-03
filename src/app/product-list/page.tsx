import styles from './product.module.css';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function ProductList() {
  return ( 
    <div>
        <h1 className={`${poppins.className} ${styles.catalog}`}> Product Catalog </h1>
        <div className={styles.container}>
            {/* Example products */}
            {/* Delete Later when filling from database */}
            <div className={styles.product}>
                <Image src="/placeholder.jpg" alt="placeholder" width={200} height={200}></Image>
                <h2 className={styles.productTitle}>Product 1</h2>
                <p className={styles.productDescription}>Description of Product 1</p>
                <p className={styles.productPrice}>Price: $10.99</p>
            </div>
            <div className={styles.product}>
                <Image src="/placeholder.jpg" alt="placeholder" width={200} height={200}></Image>
                <h2 className={styles.productTitle}>Product 2</h2>
                <p className={styles.productDescription}>Description of Product 2</p>
                <p className={styles.productPrice}>Price: $10.99</p>
            </div>
            <div className={styles.product}>
                <Image src="/placeholder.jpg" alt="placeholder" width={200} height={200}></Image>
                <h2 className={styles.productTitle}>Product 3</h2>
                <p className={styles.productDescription}>Description of Product 3</p>
                <p className={styles.productPrice}>Price: $10.99</p>
            </div>
        </div>
    </div>
  );
}