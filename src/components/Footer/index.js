import React, {useState} from "react";
import styles from "./Footer.module.sass";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footer}>
          <img className={styles.logo} src="images/logo.png" alt="logo"/>
          <div className={styles.footerLinks}>
            <div className={styles.column1}>
              <p className={styles.columnTitle}>DLL</p>
              <Link to="/"><p className={styles.columnLink}>Case Studies</p></Link>
              <Link to="/"><p className={styles.columnLink}>FAQs</p></Link>
            </div>
            <div className={styles.column2}>
              <p className={styles.columnTitle}>Shoppers</p>
              <Link to="/"><p className={styles.columnLink}>DLL Stores</p></Link>
              <Link to="/"><p className={styles.columnLink}>Shopping App</p></Link>
            </div>
            <div className={styles.column3}>
            <p className={styles.columnTitle}>Business</p>
              <Link to="/"><p className={styles.columnLink}>Become a Partner</p></Link>
              <Link to="/"><p className={styles.columnLink}>Developers</p></Link>
            </div>
            <div className={styles.column4}>
            <p className={styles.columnTitle}>Join our Community</p>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;