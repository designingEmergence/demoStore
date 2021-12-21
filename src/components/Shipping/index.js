import React, {useState} from "react";
import styles from "./Shipping.module.sass";
import Checkbox from "../Checkbox"
import CheckoutForm from "../CheckoutForm";
import Radio from "../Radio";
import RadioGroup from '@mui/material/RadioGroup';


var useSameAddress = true

const Shipping = () => {
  return (
    <>
      <div className={styles.sameAddress}>
        <Checkbox value={useSameAddress}/>
        <p className={styles.sameAddressText}>Use the same address for shipping</p>
      </div>
      {!useSameAddress && <CheckoutForm />}

      <div className={styles.shippingMethodsContainer}>
        <p className={styles.shippingMethodsText}>Shipping Methods</p>
        <div className={styles.shippingMethods}>
        <RadioGroup>
          <div className={styles.shippingMethod} >
            <Radio />
            <div className={styles.shippingMethodTextGroup}>
              <p className={styles.shippingMethodText}>Deliver to your dealer (free)</p>
              <p className={styles.shippingMethodSubText}>Estimated delivery time: 2-3 days</p>
            </div>
          </div>
          <hr className={styles.shippingMethodsDivider} />
          <div className={styles.shippingMethod} >
            <Radio />
            <div className={styles.shippingMethodTextGroup}>
              <p className={styles.shippingMethodText}>Deliver at your door ($1500)</p>
              <p className={styles.shippingMethodSubText}>Estimated delivery time: 5-7 days</p>
            </div>
          </div>
        </RadioGroup>
        </div>
      </div>

    </>
  );
};

export default Shipping;