import React, {useState} from "react";
import styles from "./Shipping.module.sass";
import CheckoutForm from "../CheckoutForm";
import RadioGroup from '@mui/material/RadioGroup';
import copy from "../../data/copy";
import { Checkbox, Radio } from "@mui/material";


var useSameAddress = true

const Shipping = () => {

  const [shippingMethod, setShippingMethod] = useState("");

  return (
    <>
      <div className={styles.sameAddress}>
        <Checkbox checked={useSameAddress} sx={{
            color: '#000000',
            '&.Mui-checked': {
                color: '#000000',
            },
        }} />
        <p className={styles.sameAddressText}>Use the same address for shipping</p>
      </div>
      {!useSameAddress && <CheckoutForm />}

      <div className={styles.shippingMethodsContainer}>
        <p className={styles.shippingMethodsText}>Shipping Methods</p>
        <div className={styles.shippingMethods}>
        <RadioGroup>
          <div className={styles.shippingMethod} >
            <Radio checked={shippingMethod === copy.shipping.option1.type} onChange={()=>setShippingMethod(copy.shipping.option1.type)} sx={{
                color: '#000000',
                '&.Mui-checked': {
                    color: '#000000',
                },
            }}/>
            <div className={styles.shippingMethodTextGroup}>
              <p className={styles.shippingMethodText}>{copy.shipping.option1.type}</p>
              <p className={styles.shippingMethodSubText}>{copy.shipping.option1.delivery}</p>
            </div>
          </div>
          <hr className={styles.shippingMethodsDivider} />
          <div className={styles.shippingMethod} >
            <Radio checked={shippingMethod === copy.shipping.option2.type} onChange={()=>setShippingMethod(copy.shipping.option2.type)} sx={{
                color: '#000000',
                '&.Mui-checked': {
                    color: '#000000',
                },
            }}/>
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