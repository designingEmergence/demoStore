import React, {useState} from "react";
import styles from "./Banner.module.sass";
import { Link } from "react-router-dom";
import cn from "classnames";

const Banner = () => {
  return (
    <>
      {/* <p>Banner</p> */}
      <div className={styles.bannerBackground}>
        <h4 className={styles.bannerTitle}>Mini Excavators</h4>
        <h1 className={styles.bannerSubtitle}>CAT 309 CR</h1>
        <h5 className={styles.bannerPrice}>$26,325.00 USD</h5>
        <Link className={cn("button", styles.button)} to="/">
            Explore & Buy
        </Link>
      </div>
      
    </>
  );
};

export default Banner;