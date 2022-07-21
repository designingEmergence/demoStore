import React, { useState } from "react";
import styles from "./Banner.module.sass";
import cn from "classnames";
import copy from "../../data/copy";


const Banner = () => {
  return (
    <>
      <div className={styles.bannerBackground}>
        <div className={styles.bannerContent}>
          <p className={styles.bannerTitle}>{copy.banner.title}</p>
          <button className={cn("button", styles.button)} href="/">Explore & Buy</button>
        </div>
      </div>
      <hr className={styles.line}/>
    </>
  );
};

export default Banner;