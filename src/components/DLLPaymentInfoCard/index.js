import React, {useState} from "react";
import styles from "./DLLPaymentInfoCard.module.sass";

function calculatePrice(price) {
  return price/4+ price*0.2;
}

const DLLPaymentInfoCard = ({price}) => {
  return (
    <>
      <div className={styles.dllPayment}>
          <img src="/images/icons/paypal.svg" alt="dll" className={styles.dllIcon} />
          <div className={styles.dllPaymentTextColumn}>
            <p className={styles.dllPaymentText}>4 interest free payments of {calculatePrice(price)}</p>
            <p className={[styles.dllPaymentText, styles.learnMore].join(' ')}>Learn More</p>
          </div>
        </div>
    </>
  );
};

export default DLLPaymentInfoCard;