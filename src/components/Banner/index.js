import React, {useState} from "react";
import styles from "./Banner.module.sass";
import { Link } from "react-router-dom";
import cn from "classnames";
import copy from "../../data/copy";


const Banner = () => {
  return (
    <>
      {/* <p>Banner</p> */}
      <div className={styles.bannerBackground}>

        <div className={styles.bannerContent}>
          <p className={styles.bannerTitle}>{copy.banner.title}</p>
          <p className={styles.bannerSubtitle}>{copy.banner.subtitle}</p>
          <p className={styles.bannerPrice}>{copy.banner.price}</p>
          {/* <Link className={cn("button", styles.button)} to="/">
              Explore & Buy
          </Link> */}
        </div>
      </div>      
    </>
  );
};

export default Banner;