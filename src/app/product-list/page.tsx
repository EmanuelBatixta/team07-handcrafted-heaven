import styles from './product.module.css';
import { Poppins } from 'next/font/google';
import {product}  from '../api/products/route';
import Image from 'next/image';
import { fetchProducts } from '../lib/products';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function ProductList() {
    const products = await fetchProducts();

    if (!products || products.length === 0) {
        return (
            <div>
                <h1 className={`${poppins.className} ${styles.catalog}`}> Product Catalog </h1>
                <p>No data available.</p>
                <p>Example placeholder data below.</p>
                <div className={styles.container}>
                    {/* Example products */}
                    {/* Shows up when the database returns nothing. */}

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
        )
    }

  return ( 
    <div>
        <h1 className={`${poppins.className} ${styles.catalog}`}> Product Catalog </h1>
        <div className={styles.container}>
            {products.map((product) => (
            <div key={product.id} className={styles.product}>
                <Image
                src={product.image_link || "/placeholder.jpg"}
                alt={product.description}
                width={200}
                height={200}
                />

                <h2 className={styles.productTitle}>
                {product.category}
                </h2>

                <p className={styles.productDescription}>
                {product.description}
                </p>

                <p className={styles.productPrice}>
                Price: ${product.price}
                </p>
            </div>
            ))}
        </div>
    </div>
  );
}