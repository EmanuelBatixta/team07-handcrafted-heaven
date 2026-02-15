import { fetchProduct } from '../../lib/products';
import { fetchProductRating } from "../../lib/products";
import Image from 'next/image';
import styles from '../product.module.css';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  console.log('ACTIVE PRODUCT PAGE PARAMS:', resolvedParams);
  
  const { id } = await params;

  if (!id) {
    return (
      <div>
        <p>Invalid product.</p>
      </div>
    );
  }

  const product = await fetchProduct(id);
  const Rating = await fetchProductRating(id);

  if (product === null || Rating === null) {
    return (
      <div>
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
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.productPage}>
      <Link href="/product-list" className={styles.back}>⬅️ Back to Product List</Link>
      <div className={styles.productSingle}>
        <div className={styles.left}>
          <h2 className={styles.productTitle}>
          {product.name}
          </h2>

          <p className={styles.productPrice}>
          Price: ${product.price}
          </p>

          <p className={styles.productRating}>
          Rating: {"⭐".repeat(Rating) + "☆".repeat(5 - Rating)}
          </p>
        </div>
        <div className={styles.right}>
          <Image
          className={styles.productImage}
          src={product.image_link || "/placeholder.jpg"}
          alt={product.description}
          width={400}
          height={300}
          />

          <p className={styles.productDescription}>
          {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}