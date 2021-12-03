import React, {useState} from "react";
import styles from "./Banner.module.sass";
import { Link } from "react-router-dom";
import cn from "classnames";

const Banner = () => {
  return (
    <>
      {/* <p>Banner</p> */}
      <div className={styles.bannerBackground}>
        <div className={styles.bannerContent}>
          <p className={styles.bannerTitle}>Mini Excavators</p>
          <p className={styles.bannerSubtitle}>CAT 309 CR</p>
          <p className={styles.bannerPrice}>$26,325.00 USD</p>
          <Link className={cn("button", styles.button)} to="/">
              Explore & Buy
          </Link>
          </div>
      </div>
      
    </>
  );
};

export default Banner;