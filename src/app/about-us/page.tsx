import Image from 'next/image'; // Importante para usar imagens otimizadas
import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* Hero */}
      <header className={styles.hero}>
        <h1 className={styles.title}>About Handcrafted Haven</h1>
        <p className={styles.subtitle}>
          Connecting passionate artisans with lovers of unique, handmade products.
        </p>
      </header>

      {/* Overview (Texto 1) */}
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

      
      <div className={styles.imageSection}>
        <Image
          src="/worker.webp"
          alt="Artisans working on handcrafted products"
          width={700}
          height={350}
          className={styles.aboutImage}
          priority 
        />
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.text}>
          We aim to revolutionize the way handcrafted items are discovered, appreciated, and acquired. 
          By providing a digital platform for artisans to showcase their creativity, Handcrafted Haven 
          fosters a thriving community of passionate creators and conscious consumers.
        </p>
      </section>

      <div className={styles.imageSection}>
        <Image
          src="/woodworker.jpeg"
          alt="Community of creators and unique items"
          width={700} 
          height={350}
          className={styles.aboutImage}
        />
      </div>
 

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What We Offer</h2>
        
        <div className={styles.featuresGrid}>

          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Seller Profiles</h3>
            <p className={styles.featureText}>
              Dedicated spaces for artisans to showcase their craftsmanship and share their stories.
            </p>
          </div>

 
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Community Engagement</h3>
            <p className={styles.featureText}>
              A focus on connecting creators with a broader audience who value authenticity.
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Secure & User-Friendly</h3>
            <p className={styles.featureText}>
              An optimized experience with secure e-commerce capabilities for all devices.
            </p>
          </div>
        </div>
      </section>

      {/* Project Info (Texto 3) */}
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