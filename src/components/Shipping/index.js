import React, {useState} from "react";
import styles from "./Shipping.module.sass";
import Checkbox from "../Checkbox"
import CheckoutForm from "../CheckoutForm";
import Radio from "../Radio";
import RadioGroup from '@mui/material/RadioGroup';
import copy from "../../data/copy";


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
              <p className={styles.shippingMethodText}>{copy.shipping.option1.type}</p>
              <p className={styles.shippingMethodSubText}>{copy.shipping.option1.delivery}</p>
            </div>
          </div>
          <hr className={styles.shippingMethodsDivider} />
          <div className={styles.shippingMethod} >
            <Radio />
            <div className={styles.shippingMethodTextGroup}>
              <p className={styles.shippingMethodText}>{copy.shipping.option2.type}</p>
              <p className={styles.shippingMethodSubText}>{copy.shipping.option2.delivery}</p>
            </div>
          </div>
        </RadioGroup>
        </div>
      </div>

    </>
  );
};

export default Shipping;