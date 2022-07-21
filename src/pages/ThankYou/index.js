import React, {useEffect} from 'react';
import styles from './ThankYou.module.sass';
import cn from 'classnames';
import { useNavigate } from "react-router";
import { useCart } from 'react-use-cart'
import Link from '../../components/Link'
import OrderSummary  from '../../components/OrderSummary'

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
          <p className={styles.subtext}>Order Number: <Link to="" color="secondary">239074238</Link></p>
          <p className={styles.subtext}>After succesful completion of the customer verification process you will be contacted <span className={styles.highlighted}>within 2-3 working days</span> to align delivery date.</p>
          <p className={styles.info}>Please find your order summary below. This information will also be sent to your email at john.doe@email.com</p>
          <OrderSummary />
          <button onClick={()=> navigate('/')} className={cn('button', styles.continueButton)}>Continue Shopping</button>
        </div>
      </div>
    </>
  );
};

export default ThankYou; 