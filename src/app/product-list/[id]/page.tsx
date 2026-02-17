import { fetchProduct, fetchProductRating } from '../../lib/products';
import Image from 'next/image';
import styles from '../product.module.css';
import Link from 'next/link';
import { auth } from '@/auth'; 
import ReviewForm from '@/components/ReviewForm'; 
import { fetchReview } from '../../lib/reviews';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const { id } = await params;
  const productIdInt = parseInt(id);

  if (!id) {
    return (
      <div>
        <p>Invalid product.</p>
      </div>
    );
  }

  const product = await fetchProduct(id);
  const Rating = await fetchProductRating(id);
  const reviews = await fetchReview(id);
  const session = await auth();

  if (product === null) {
    return (
      <div>
        <p>No data available.</p>
        <p>Example placeholder data below.</p>
        <div className={styles.container}>
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
          <h2 className={styles.productTitle}>{product.name}</h2>
          <p className={styles.productPrice}>Price: ${product.price}</p>
          <p className={styles.productRating}>
             {"⭐".repeat(Rating) + "☆".repeat(5 - Rating)}
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
          <p className={styles.productDescription}>{product.description}</p>
        </div>
      </div>

      <hr style={{ margin: '4rem 0 2rem 0', border: '0', borderTop: '1px solid #ddd' }} />

      <div className={styles.reviews}>
        <h3 style={{ marginBottom: '1rem' }}>Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className={styles.review}>
              <h3>{review.userName || "Anonymous User"}</h3>
              <p>
                {"⭐".repeat(review.stars) + "☆".repeat(5 - review.stars)}
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>

      <hr style={{ margin: '4rem 0 2rem 0', border: '0', borderTop: '1px solid #ddd' }} />
      
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ReviewForm productId={productIdInt} isLoggedIn={!!session?.user} />
      </div>
      
    </div>
  );
}