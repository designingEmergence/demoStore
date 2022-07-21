import React, {useState} from "react";
import Link from '../Link'
import styles from "./Ribbon.module.sass";


const Ribbon = ({}) => {

  return (
    <>
      <div className={styles.ribbon}>
        <h5 className={styles.ribbonText}>Shop Now. Pay with DLL Finance. <Link to="">Learn More</Link></h5>
      </div>
    </>
  );
};
export default Ribbon;