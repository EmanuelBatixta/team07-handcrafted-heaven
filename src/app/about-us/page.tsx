import styles from './about.module.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function About() {
  return (
    <div className={styles.container}>
      
      {/* Hero */}
      <header className={styles.header}>
        <h1 className={`${poppins.className} ${styles.title}`}>About Handcrafted Haven</h1>
        <p className={styles.subtitle}>
          Connecting passionate artisans with lovers of unique, handmade products.
        </p>
      </header>

      {/* Overview */}
      <section className={styles.section}>
        <p className={styles.text}>
          Handcrafted Haven is an innovative web application that serves as a virtual marketplace, 
          connecting talented creators with potential customers who appreciate the beauty and 
          quality of handmade products.
        </p>
        <p className={styles.text}>
          Our platform aims to provide a space for artisans and crafters to showcase and sell 
          their unique handcrafted items, fostering a sense of community and supporting local 
          artisans.
        </p>
      </section>

      {/* Our Mission */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.text}>
          We aim to revolutionize the way handcrafted items are discovered, appreciated, and acquired. 
          By providing a digital platform for artisans to showcase their creativity, Handcrafted Haven 
          fosters a thriving community of passionate creators and conscious consumers.
        </p>
      </section>

      {/* What We Offer */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What We Offer</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <strong>Seller Profiles:</strong> Dedicated spaces for artisans to showcase their 
            craftsmanship and share their stories.
          </li>
          <li className={styles.listItem}>
            <strong>Community Engagement:</strong> A focus on connecting creators with a broader 
            audience who value authenticity.
          </li>
          <li className={styles.listItem}>
            <strong>Secure & User-Friendly:</strong> An optimized experience with secure e-commerce 
            capabilities for all devices.
          </li>
        </ul>
      </section>

      {/* Project Info */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About the Project</h2>
        <p className={styles.text}>
          Handcrafted Haven was developed as a comprehensive group project to demonstrate 
          Full Stack Software Development skills. Built using Next.js, Node.js, and deployed on the cloud.
        </p>
      </section>
    </div>
  );
}