import React, {useState} from "react";
import styles from "./PaymentIcons.module.sass";

const PaymentIcons = () => {
  return (
    <>
      <div className={styles.paymentIconsContainer}>
        <img src="/images/paymentIcons.png" alt="Payment Options" className={styles.paymentIcons}/>
      </div>
    </>
  );
};

export default PaymentIcons;