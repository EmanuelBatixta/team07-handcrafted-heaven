'use client'

import { useActionState, useState } from 'react';
import { createReview } from '@/app/lib/reviews'; 
import styles from './reviews.module.css'; 
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function ReviewForm({ productId, isLoggedIn }: { productId: number, isLoggedIn: boolean }) {
  const [state, formAction, isPending] = useActionState(createReview, null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  if (!isLoggedIn) {
    return (
        <div className={`${styles.container} ${poppins.className}`} style={{textAlign: 'center', padding: '3rem 1rem'}}>
            <h3 className={styles.title}>Want to review this product?</h3>
            <p className={styles.subtitle}>Please log in to share your experience.</p>
            <Link 
                href="/login" 
                className={styles.submitBtn} 
                style={{ 
                    display: 'inline-block', 
                    textDecoration: 'none', 
                    maxWidth: '200px',
                    lineHeight: '1.5'
                }}
            >
                Log In
            </Link>
        </div>
    );
  }

  if (state?.message === 'Success') {
    return (
        <div className={`${styles.successBox} ${poppins.className}`}>
            <h3>Thank you for your review! ⭐</h3>
            <p>Your feedback has been posted successfully.</p>
            <button 
                onClick={() => window.location.reload()} 
                className={styles.submitBtn} 
                style={{marginTop: '1rem'}}
            >
                View Review
            </button>
        </div>
    );
  }

  return (
    <div className={`${styles.container} ${poppins.className}`}>
      <h3 className={styles.title}>Share your experience</h3>
      <p className={styles.subtitle}>What did you think about this handcrafted item?</p>
      
      <form action={formAction} className={styles.form}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="stars" value={rating} />

        <div className={styles.starsContainer} onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`${styles.star} ${star <= (hover || rating) ? styles.starActive : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                >
                    ★
                </span>
            ))}
        </div>

        <textarea
          name="comment"
          className={styles.textarea}
          placeholder="Write your review here..."
          required
        />

        {state?.message && state.message !== 'Success' && (
            <p className={styles.error}>{state.message}</p>
        )}

        <button type="submit" className={styles.submitBtn} disabled={isPending || rating === 0}>
          {isPending ? 'Posting...' : 'Post Review'}
        </button>
      </form>
    </div>
  );
}