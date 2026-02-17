import Image from "next/image"
import Link from 'next/link'
import styles from './app.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Título escondido visualmente, mantido por SEO */}
      <h1 className={styles.title}>Home</h1>

      <div className={styles.container}>
        
        {/* Coluna de Texto Principal */}
        <div className={styles.textContent}>
          <span className={styles.badge}>100% Handmade</span>
          
          <h2>
            Welcome to <br/>
            <span className={styles.highlight}>Handcrafted Haven</span>
          </h2>
          
          <p>
            A vibrant platform for artisans and crafters to showcase 
            their unique, passion-crafted items and share them with the world.
          </p>
          <p>
            Find beautiful, one-of-a-kind treasures that bring soul to your everyday life.
          </p>
          
          <Link href="/product-list" className={styles.ctaButton}>
            Explore Collection <span className={styles.arrow}>→</span>
          </Link>
        </div>
        
        {/* Coluna da Imagem */}
        <div className={styles.imageWrapper}>
          <Image 
            className={styles.picture} 
            src="/hand-crafted-image.jpg" 
            alt="Handcrafted items showcase" 
            width={612} 
            height={408}
            priority
          />
        </div>

      </div>
    </div>
  );
}