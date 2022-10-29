import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        Copyright © 2022 Suyeon Yang. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
