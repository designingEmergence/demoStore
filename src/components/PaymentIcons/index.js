import React, {useState} from "react";
import styles from "./PaymentIcons.module.sass";

const PaymentIcons = () => {
  return (
    <>
      <div className={styles.paymentIcons}>
        <img src="/images/paymentIcons.png" alt="Payment Options" />
      </div>
    </>
  );
};

export default PaymentIcons;