import styles from './components.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h3 className={styles.footerTitle}>Handcrafted Haven</h3>
        <p className={styles.footerText}>
          Empowering artisans and bringing unique, passion-crafted items to your everyday life.</p>
        
        {/* list of team members */}
        <ul className={styles.teamMembers}>
          <li className={styles.teamMember}>Tyson Pace</li>
          <li className={styles.teamMember}>Emanuel Oliveira</li>
          <li className={styles.teamMember}>Jonathas Oliveira</li>
          <li className={styles.teamMember}>Ibraim Vergara</li>
          <li className={styles.teamMember}>Alex Condori</li>
        </ul>
      </div>
      
      <div className={styles.footerDivider}></div>
      
      <p className={styles.footerCopy}>
        &copy; {currentYear} Group 07 | WDD 430 Full Stack Development. All rights reserved.
      </p>
    </footer>
  );
}