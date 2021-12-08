import React, {useState} from "react";
import Radio from "../Radio";
import styles from "./Payments.module.sass";

const Payments = () => {
  return (
    <>
      <div  className={styles.paymentsContainer}>
        <p className={styles.paymentsTitle}>Payments</p>
        <div className={styles.paymentMethods}>
          <div className={styles.paymentMethod}>
            <Radio />
            <p className={styles.paymentMethodTitle}>Credit Card</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;