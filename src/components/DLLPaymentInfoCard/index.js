import React, {useState} from "react";
import styles from "./DLLPaymentInfoCard.module.sass";
import NumberFormat from 'react-number-format';
import InfoButtonTooltip from '../InfoButtonTooltip';
import ExplanationModal from "../ExplanationModal";


function calculatePrice(price) {
  return price/4+ price*0.2;
}

const InfoText = ({price}) => {
  return (
    <p className={styles.dllPaymentText}>The <NumberFormat value={price/60}  decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={' $'} renderText={value => <span className={styles.amount}>{value}</span>}/> per month comes from aptent taciti sociosqu ad litora torquent per conubia nostra.</p>
  )
}

const DLLPaymentInfoCard = ({price}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={styles.dllPayment}>
          <img src="/images/icons/dll.svg" alt="dll" className={styles.dllIcon} />
          <div className={styles.dllPaymentTextColumn}>
            <p className={styles.dllPaymentText}>Own or use this product from:</p>
            <span><NumberFormat value={price/60}  decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={' $'} renderText={value => <span className={styles.amount}>{value}</span>}/></span><span className={styles.dllPaymentText}>per month</span>
          </div>
          <InfoButtonTooltip onClick={() => setShow(true)} text={InfoText({price})}/>
          <ExplanationModal show={show} setShow={setShow}/>
        </div>
    </>
  );
};

export default DLLPaymentInfoCard;