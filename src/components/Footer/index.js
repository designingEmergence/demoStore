import React, {useState} from "react";
import styles from "./Footer.module.sass";
import Link from "../Link";

const Footer = () => {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footer}>
          <p className={styles.logoWhite}>Demostore</p>
          <div className={styles.footerLinks}>
            <div className={styles.column1}>
              <p className={styles.columnTitle}>Konica Minolta</p>
              <Link variant='clear' to="/"><p className={styles.columnLink}>Case Studies</p></Link>
              <Link variant='clear' to="/"><p className={styles.columnLink}>FAQs</p></Link>
            </div>
            <div className={styles.column2}>
              <p className={styles.columnTitle}>Shoppers</p>
              <Link variant='clear' to="/"><p className={styles.columnLink}>Vendors</p></Link>
              <Link variant='clear' to="/"><p className={styles.columnLink}>Shopping App</p></Link>
            </div>
            <div className={styles.column3}>
            <p className={styles.columnTitle}>Business</p>
              <Link variant='clear' to="/"><p className={styles.columnLink}>Become a Partner</p></Link>
              <Link variant='clear' to="/"><p className={styles.columnLink}>Developers</p></Link>
            </div>
            <div className={styles.column4}>
            {/* <p className={styles.columnTitle}>Join our Community</p> */}
              
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.legal}><p>© 2022 DLL. All rights reserved</p></div>
          <div className={styles.legalLinks}>
            <Link variant='clear' to="">Terms & Conditions</Link>
            <Link variant='clear' to="">Contact</Link>
            <Link variant='clear' to="">Sitemap</Link>
            <Link variant='clear' to="">Disclaimer</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;