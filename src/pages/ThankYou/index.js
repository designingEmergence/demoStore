import React, {useEffect} from 'react';
import styles from './ThankYou.module.sass';
import cn from 'classnames';
import { useNavigate } from "react-router";
import { useCart } from 'react-use-cart'

const ThankYou = () => {
  let navigate = useNavigate();
  const { emptyCart } = useCart();

  useEffect(() => {
    emptyCart();
  });

  return (
    <>
      <div className={styles.thankYouContainer}>
        <div className={styles.column1}>
          <img className={styles.thankYouImage} src="/images/thankyou.png" alt="thankyou" />
        </div>
        <div className={styles.column2}>
          <p className={styles.title}>Thank you for your purchase!</p>
          <p className={styles.subtext}>Order Number: 239074238</p>
          <p className={styles.subtext}>Your order has been confirmed and you will receive an order confirmation email shortly.</p>
          <button onClick={()=> navigate('/')} className={cn('button', styles.continueButton)}>Continue Shopping</button>
        </div>
      </div>
    </>
  );
};

export default ThankYou; 