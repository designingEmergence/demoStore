import React from 'react';
import styles from './Checkout.module.sass';
import CheckoutForm from '../../components/CheckoutForm'
import Shipping from '../../components/Shipping'
import Payments from '../../components/Payments'
import BagOverview from '../../components/BagOverview';
import FinancingOverview from '../../components/FinancingOverview';
import cn from "classnames";
import { useSearchParams } from 'react-router-dom';


const Checkout = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const isFinancing = searchParams.get('financing') === 'true';

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
          {isFinancing ? <div>
            <FinancingOverview />
            <button className={cn("button", styles.placeOrderButton)}>Get Financing</button>
          </div>:
          <div>
            <Payments />
            <button className={cn("button", styles.placeOrderButton)}>Place Order</button>
          </div>}
        </div>
        <div className={styles.column2}>
          <BagOverview /> 
        </div>
      </div>
    </>
  );
};

export default Checkout;