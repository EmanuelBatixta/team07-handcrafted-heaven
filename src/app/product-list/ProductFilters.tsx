'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './product.module.css';
import { Product } from '../lib/definitions';
import { Poppins } from 'next/font/google';
import { set } from 'zod';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function ProductFilter({
  products,
}: {
  products: Product[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = Array.from(
    new Set(products.map(p => p.category))
  );

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(p => p.category === selectedCategory);

  if (!products || products.length === 0) {
    return (
        <div>
            <h1 className={`${poppins.className} ${styles.catalog}`}> Product Catalog </h1>
            <div className={styles.content}>
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
        </div>
    );
  }

  return ( 
    <div>
        <div className={styles.catalog}>
            <h1 className={`${poppins.className}`}> Product Catalog </h1>
            
            <div className={styles.catalogButton}>
                <button
                    className={styles.filter}
                    onClick={() => setOpen(!open)}
                >
                    <Image src="/filter.png" alt="cart" width={30} height={30} />
                </button>

                {open && (
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setOpen(false);
                        }}
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.container}>
                {filteredProducts.map((product) => (
                <Link key={product.id} className={styles.product} href={`/product-list/${product.id}`}>
                    <Image
                    className={styles.cardImage}
                    src={product.image_link || "/placeholder.jpg"}
                    alt={product.description}
                    width={250}
                    height={200}
                    />

                    <h2 className={styles.productTitle}>
                    {product.name}
                    </h2>

                    <p className={styles.productDescription}>
                    {product.description}
                    </p>

                    <p className={styles.productPrice}>
                    Price: ${product.price}
                    </p>
                </Link>
                ))}
            </div>
        </div>
    </div>
  );
}