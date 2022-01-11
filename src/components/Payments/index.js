import React, {useState} from "react";
import Radio from "@mui/material/Radio";
import styles from "./Payments.module.sass";
import TextInput from "../TextInput";
import cn from "classnames";

const Payments = ({paymentMethod, paymentMethodChange}) => {

  // const [paymentMethod, setPaymentMethod] = useState(paymentType);


  return (
    <>
      <div  className={styles.paymentsContainer}>
        <p className={styles.paymentsTitle}>Payment</p>
        <div className={styles.paymentMethods}>
           
          <div className={styles.paymentMethod}>
            <div className={styles.paymentMethodSelector}>
              <Radio 
                checked={paymentMethod==="card"} 
                onChange={paymentMethodChange} 
                value="card"
                name="radio-buttons" />
              <p className={styles.paymentMethodTitle}>Card</p>
            </div>
            {(paymentMethod === 'card') && <div className={styles.paymentMethodSelected}>
              <div>
                <TextInput label="Card Number" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}"  maxlength="19" placeholder="xxxx xxxx xxxx xxxx" />
              </div>
              <div className={styles.formRow}>
                <TextInput className={cn(styles.form__half, styles.formLeft)} label="Expiration Date" type="month"  />
                <TextInput className={cn(styles.form__half, styles.formRight)} label="CVC" type="tel"  />
              </div>
            </div>}
          </div>
          <hr className={styles.paymentDividerLine}/>
          <div className={styles.paymentMethod}>
            <div className={styles.paymentMethodSelector}>
              <Radio 
                checked={paymentMethod==="dll"} 
                onChange={paymentMethodChange} 
                value="dll"
                name="radio-buttons" />
              <p className={styles.paymentMethodTitle}>Buy now, pay later</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;