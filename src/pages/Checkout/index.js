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
import { Checkbox } from '@mui/material';
import CheckoutValidationModal from '../../components/CheckoutValidationModal';


const Checkout = () => {
  let navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const isFinancing = searchParams.get('financing') === 'true';

  const [paymentMethod, setPaymentMethod] = useState(isFinancing ? 'financing' : 'card');
  const [showCheckoutValidation, setShowCheckoutValidation] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const handlePaymentMethodChange = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  function redirectWithDelay(path, delay, external=false) {
    setRedirect(true);
    setTimeout(() => {
      external ? window.open(path, '_self'):navigate(path);
     } , delay);
  }

  const label = { inputProps: { 'aria-label': 'I agree to the DLL Finance Service and Privacy Policy.' } };

  return (
    <>
      <div className={styles.checkoutContainer}>
        <div className={styles.column1}>
          <div className={styles.checkoutHeader}>
            <p className={styles.checkoutHeaderText}>Checkout</p>
          </div>
          <hr className={styles.checkoutDividerLine}/>
          <CheckoutForm />
          <Shipping />
          <p className={styles.paymentMethodTitle}>Payment Method</p>
          <div>
            <FinancingOverview paymentMethod={paymentMethod} paymentMethodChange={handlePaymentMethodChange} />
          </div>
          <div>
            <Payments paymentMethod={paymentMethod} paymentMethodChange={handlePaymentMethodChange}/>
              <div className={styles.terms}>
                <Checkbox   sx={{
                  color: '#000000',
                  '&.Mui-checked': {
                    color: '#000000',
                  },
                }}/>
                <p>I agree to the <a href="">Konica Minolta Premier Financing Service</a> and <a href="">Privacy Policy</a>.</p>
              </div>
              {(paymentMethod !== 'card') ? 
              <button onClick={()=> {
                redirectWithDelay('https://www.figma.com/proto/459fYXEnnuAPVBaKbyHWN2/DLL%2B-UI-Kit---v1.0?page-id=9264%3A60754&node-id=9264%3A60843&viewport=-1324%2C1854%2C0.14&scaling=min-zoom&starting-point-node-id=9264%3A60843',200, true);
              }} className={cn("button", styles.placeOrderButton)}>
                {(!redirect ? 'Get Financing': 'Redirecting...')}
              </button> :  
              <button onClick={()=> redirectWithDelay('/thankyou',3000)}className={cn("button", styles.placeOrderButton)}>
                Place Order
              </button>}
          </div>
        </div>
        <div className={styles.column2}>
          <BagOverview /> 
        </div>
        <CheckoutValidationModal show={showCheckoutValidation} setShow={setShowCheckoutValidation}/>
      </div>
    </>
  );
};

export default Checkout;