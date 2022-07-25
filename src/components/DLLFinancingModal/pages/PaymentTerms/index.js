import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import styles from "./PaymentTerms.module.sass";
import Dropdown from "../../../Dropdown"; 
import FormSlider from "../../../Slider";
import cn from "classnames";
import NumberFormat from "react-number-format";

import { useCart } from "react-use-cart"
import { store } from "../../../../store";



const PaymentTerms =({linkToCheckout = true, setPage, nextPage}) => {
  const { cartTotal } = useCart();
  const { state, dispatch } = useContext(store);

  const totalPrice = cartTotal + state.shippingMethod.price;
  const interest = state.interestRate

  const terms = state.financingConfig

  const paymentTerms = ["Monthly", "Quarterly", "Semi-annually", "Annually"];
  const [paymentTerm, setPaymentTerm] = useState(terms.paymentTerms);
  const durationOptions = [12, 24, 36, 48];
  const [duration, setDuration] = useState(terms.duration);
  const downPaymentMin = 0;
  const downPaymentMax = totalPrice;
  const [downPayment, setDownPayment] = useState(terms.downPayment);
  const [financeAmount, setFinanceAmount] = useState(terms.financingAmount);
  const [paybackAmount, setPaybackAmount] = useState(terms.paybackPerTerm);
  const [pricePerTerm, setPricePerTerm] = useState(terms.pricePerTerm);
  const [pricePerMonth, setPricePerMonth] = useState(terms.pricePerMonth);
  const [interestPerTerm, setInterestPerTerm] = useState(terms.interestPerTerm);
  
  function setPaymentTerms() {
    let financingConfig = {
      paymentTerms: paymentTerm,
      duration: duration,
      totalCost: totalPrice,
      downPayment: downPayment,
      financingAmount: financeAmount,
      costPerTerm: pricePerTerm,
      costPerMonth: pricePerMonth,
      paybackPerTerm: paybackAmount,
      interestPerTerm: interestPerTerm,
    }
    dispatch({
      type: "SET_FINANCING_CONFIGURATION",
      payload: financingConfig
    })

    if(!linkToCheckout) {
      setPage(nextPage)
    }
  }

  function calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest){
    const financeAmount = totalPrice - downPayment;
    let numPaymentTerms = 0;
    let monthlyConverter = 0;
    
    switch(paymentTerm){
      case "Monthly":
        numPaymentTerms = duration;
        monthlyConverter = 1;
        break;
      case "Quarterly":
      numPaymentTerms = duration/3;
      monthlyConverter = 3;
        break;
      case "Semi-annually":
        numPaymentTerms = duration/6;
        monthlyConverter = 6;
        break;
      case "Annually":
        numPaymentTerms = duration/12;
        monthlyConverter = 12;
        break;
    }
    let interestPerTerm = financeAmount * interest / numPaymentTerms;
    let paybackAmount = financeAmount / numPaymentTerms;
    let pricePerTerm = paybackAmount + interestPerTerm;
    let pricePerMonth = pricePerTerm / monthlyConverter;


    setFinanceAmount(financeAmount);
    setPaybackAmount(paybackAmount);
    setPricePerTerm(pricePerTerm);
    setPricePerMonth(pricePerMonth);
    setInterestPerTerm(interestPerTerm)
  }

  useEffect(()=>{
    calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest);
  }, [totalPrice, downPayment, duration, paymentTerm, interest])


  const handleDownPaymentChange = (newValue) => {
    setDownPayment(newValue);
    calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest)
  };

  const handleDurationChange = (newValue) => {
    setDuration(newValue);
    calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest)

  };

  const handlePaymentTermChange = (newValue) => {
    setPaymentTerm(newValue);
    calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest)
  };


  return (
    <div className={styles.paymentTerms}>
      <div className={styles.paymentTermsConfig}>
        <form>
          <div className={styles.paymentTermsRow}>
            <div className={styles.paymentRowLeft}><Dropdown
              className={styles.dropdown}
              value={paymentTerm}
              options={paymentTerms}
              setValue={handlePaymentTermChange}
              label="Payment Frequency" /></div>
            <div className={styles.paymentRowRight}><Dropdown
              className={styles.dropdown}
              value={duration}
              options={durationOptions}
              setValue={handleDurationChange}
              label="Contract Duration (in months)" /></div>
            </div>
          {/* <FormSlider label="Down Payment" min={downPaymentMin} max={downPaymentMax} value={downPayment} setValue={handleDownPaymentChange} /> */}
        </form>
      </div>
      <div className={styles.paymentTermsResult}>
        {/* <div className={cn(styles.paymentTermsResultLine, styles.lineHighlighted)}>
          <p className={cn(styles.paymentTermsResultLine_title, styles.blackText)}>Financing Amount</p>
          <NumberFormat value={financeAmount} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>}  />
        </div> */}
        <div className={cn(styles.paymentTermsResultLine, styles.lineHighlighted)}>
          <p className={styles.paymentTermsResultLine_title}>Price per month</p>
          <NumberFormat value={pricePerMonth} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>} />
        </div>
        <div className={styles.paymentTermsResultLine}>
          <p className={styles.paymentTermsResultLine_title}>Price per term</p>
          <NumberFormat value={pricePerTerm} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>} />
        </div>
        {/* <div className={styles.paymentTermsResultLine}>
          <p className={styles.paymentTermsResultLine_title}>Payback</p>
          <NumberFormat value={paybackAmount} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>}/>
        </div>
        <div className={styles.paymentTermsResultLine}>
          <p className={styles.paymentTermsResultLine_title}>Interest (3%)</p>
          <NumberFormat value={interestPerTerm} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0}renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>}/>
        </div> */}
      </div>
      {linkToCheckout ?  <Link to={{
        pathname: '/checkout',
        search: `?financing=${true}`
      }} className={styles.no_underline} ><button onClick={()=>{setPaymentTerms()}} className={cn("button", styles.continueButton)}>Continue</button></Link>

      : <button onClick={()=>{setPaymentTerms()}} className={cn("button", styles.continueButton)}>Continue</button>}
    </div>
    );
}

export default PaymentTerms;