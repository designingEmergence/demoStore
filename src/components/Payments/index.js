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
            <div className={styles.paymentMethodSelector}>
              <Radio />
              <p className={styles.paymentMethodTitle}>Buy now, pay later</p>
            </div>

            <div className={styles.paymentMethodSelected}>
              <hr className={styles.paymentMethod__SelectedLine} />
              <div className={styles.paymentMethod__PayOverTime} >
                <p className={styles.paymentMethod__PayOverTimeText}>Pay over time</p>
                {/* testdrive icon */}
              </div>
              <div className={styles.paymentMethod__Selections} >
                <div className={styles.paymentMethod__Selection} >
                  <p className={styles.paymentMethod__SelectionText}>4 interest-free payments of $30</p>
                  <p className={styles.paymentMethod__SelectionSubtext}>Interest-free card payments</p>
                </div>
                <hr className={styles.paymentMethod__SelectionLine} />
                <div className={styles.paymentMethod__Selection} >
                  <p className={styles.paymentMethod__SelectionText}>6 monthly payments of $20</p>
                  <p className={styles.paymentMethod__SelectionSubtext}>Interest-free card payments</p>
                </div>
              </div>
              <p className={styles.paymentMethod__SelectedSubtext}>By continuing, I accept DLL Finance Service, Privacy Policy, Pay Later in 4 terms and request electronic communication.</p>
            </div>  
          </div>
          <div className={styles.paymentMethod}>
            <div className={styles.paymentMethodSelector}>
              <Radio />
              <p className={styles.paymentMethodTitle}>Card</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;