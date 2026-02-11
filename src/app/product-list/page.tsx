import styles from './product.module.css';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { fetchProducts } from '../lib/products';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function ProductList() {
  const products = await fetchProducts();

  //return <ProductFilter products={products} />;
}