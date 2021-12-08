import React from 'react';
import styles from './Checkout.module.sass';
import CheckoutForm from '../../components/CheckoutForm'
import Shipping from '../../components/Shipping'
import PlaceOrder from '../../components/PlaceOrder'
import BagOverview from '../../components/BagOverview';
import cn from "classnames";


const Checkout = () => {
  return (
    <>
      <div className={styles.checkoutContainer}>
        <div className={styles.column1}>
          <div className={styles.checkoutHeader}>
            <p className={styles.checkoutHeaderText}>Checkout</p>
            <button className={cn("button", styles.testCredentialsButton)}>Use test credentials</button>
          </div>
          <hr className={styles.checkoutDividerLine}/>
          <CheckoutForm />
          <Shipping />
          <PlaceOrder />
        </div>
        <div className={styles.column2}>
          <BagOverview /> 
        </div>
      </div>
    </>
  );
};

export default Checkout;