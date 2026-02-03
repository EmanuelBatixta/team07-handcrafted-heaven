import { Poppins } from 'next/font/google';
import styles from './cart.module.css';
import Image from 'next/image';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Cart() {
    return (
        <div>
            <h1 className={poppins.className}>Cart</h1>
            <div className={styles.container}>
                <div className={styles.product}>
                    <Image src="/placeholder.jpg" alt="placeholder" width={100} height={100}></Image>
                    <h2>Product 1</h2>
                    <p>Price: $10.99</p>
                </div>
                <div className={styles.product}>
                    <Image src="/placeholder.jpg" alt="placeholder" width={100} height={100}></Image>
                    <h2>Product 2</h2>
                    <p>Price: $10.99</p>
                </div>
                <div className={styles.product}>
                    <Image src="/placeholder.jpg" alt="placeholder" width={100} height={100}></Image>
                    <h2>Product 3</h2>
                    <p>Price: $10.99</p>
                </div>
            </div>
            <div className={styles.checkout}>
                <button className={styles.button}>Checkout</button>
            </div>
        </div>
    )
}