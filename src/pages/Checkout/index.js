import React, {useState} from 'react';
import styles from './Checkout.module.sass';
import CheckoutForm from '../../components/CheckoutForm'
import Shipping from '../../components/Shipping'
import Payments from '../../components/Payments'
import BagOverview from '../../components/BagOverview';
import FinancingOverview from '../../components/FinancingOverview';
import cn from "classnames";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router";


const Checkout = () => {
  let navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [redirect, setRedirect] = useState(false);

  const isFinancing = searchParams.get('financing') === 'true';

  function redirectWithDelay(path, delay) {
    setRedirect(true);
    setTimeout(() => {
      navigate(path);
    } , delay);
  }

  return (
    <>
      <div className={styles.checkoutContainer}>
        <div className={styles.column1}>
          <div className={styles.checkoutHeader}>
            <p className={styles.checkoutHeaderText}>Checkout</p>
            {/* <button className={cn("button", styles.testCredentialsButton)}>Use test credentials</button> */}
          </div>
          <hr className={styles.checkoutDividerLine}/>
          <CheckoutForm />
          <Shipping />
          {isFinancing ? <div>
            <FinancingOverview />
            <button onClick={()=> redirectWithDelay('/external-dll-check',3000)}className={cn("button", styles.placeOrderButton)}>
              {(!redirect ? 'Get Financing': 'Redirecting...')}
            </button>
          </div>:
          <div>
            <Payments />
            <button onClick={()=> navigate('/thankyou')} className={cn("button", styles.placeOrderButton)}>Place Order</button>
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