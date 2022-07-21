import React, {useState} from "react";
import Radio from "@mui/material/Radio";
import styles from "./Payments.module.sass";
import TextInput from "../TextInput";
import cn from "classnames";

import DLLPaymentInfoCard from '../../components/DLLPaymentInfoCard';
import { useCart } from 'react-use-cart';


const Payments = ({paymentMethod, paymentMethodChange}) => {

  const { cartTotal } = useCart();

  return (
    <>
      <div  className={styles.paymentsContainer}>
        {/* <p className={styles.paymentsTitle}>Payment</p> */}
        <div className={styles.paymentMethods}>
           
          <div className={styles.paymentMethod}>
            <div className={styles.paymentMethodContainer}>
              <div className={styles.paymentMethodSelector}>
                <Radio 
                  checked={paymentMethod==="card"} 
                  onChange={paymentMethodChange} 
                  value="card"
                  name="radio-buttons" 
                  sx={{
                    color: '#000000',
                    '&.Mui-checked': {
                        color: '#000000',
                    },
                  }} />
                <p className={styles.paymentMethodTitle}>Card</p>
              </div>
              <img className={styles.paymentIcons} src="/images/paymentIcons-wo-dll.png" alt=""/>
            </div>
            {(paymentMethod === 'card') && <div className={styles.paymentMethodSelected}>
              <div>
                <TextInput label="Card Number" type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}"  maxLength="19" placeholder="xxxx xxxx xxxx xxxx" />
              </div>
              <div className={styles.formRow}>
                <TextInput className={cn(styles.form__half, styles.formLeft)} label="Expiration Date" type="month"  />
                <TextInput className={cn(styles.form__half, styles.formRight)} label="CVC" type="tel"  />
              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;