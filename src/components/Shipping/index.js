import React, {useState} from "react";
import styles from "./Shipping.module.sass";
import Checkbox from "../Checkbox"
import CheckoutForm from "../CheckoutForm";
import Radio from "../Radio";

var useSameAddress = true

const Shipping = () => {
  return (
    <>
      <div className={styles.sameAddress}>
        <Checkbox />
        <p className={styles.sameAddressText}>Use the same address for shipping</p>
      </div>
      {!useSameAddress && <CheckoutForm />}

      <div className={styles.shippingMethodsContainer}>
        <p className={styles.shippingMethodsText}>Shipping Methods</p>
        <div className={styles.shippingMethods}>
          <div className={styles.shippingMethod} >
            <Radio />
            <div className={styles.shippingMethodTextGroup}>
              <p className={styles.shippingMethodText}>DHL (Free delivery)</p>
              <p className={styles.shippingMethodSubText}>Estimated delivery time: 2-3 days</p>
            </div>
          </div>
          <hr className={styles.shippingMethodsDivider} />
          <div className={styles.shippingMethod} >
            <Radio />
            <div className={styles.shippingMethodTextGroup}>
              <p className={styles.shippingMethodText}>UPS 1-day delivery ($30)</p>
              <p className={styles.shippingMethodSubText}>Next day delivery</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Shipping;