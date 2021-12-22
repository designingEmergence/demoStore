import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import styles from "./DLLFinancingModal.module.sass";
import Modal from '@mui/material/Modal';
import Dropdown from "../Dropdown";
import FormSlider from "../Slider";
import cn from "classnames";
import NumberFormat from "react-number-format";
import { duration, PopperUnstyled } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useCart } from "react-use-cart"
import { store } from "../../store";



function OwnItUseItPage(props) {
  const { cartTotal } = useCart();

  function FinancingTypeContainer(props) {
    return (
      <div className={styles.financingTypeContainer}>
        <p className={styles.financingTypeContainer_title}>{props.title}</p>
        <button onClick={()=>props.selectionFunction(props.variableValue)} className={styles.financingTypeContainer_button}>
          <p className={styles.financingTypeContainer_button_title}>{props.buttonTitle}</p>
          <NumberFormat value={props.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix={'$'} 
           renderText={value => <span className={styles.financingTypeContainer_button_price}>{value}</span>} />
          <span className={styles.financingTypeContainer_button_title}> per month</span>
          <p className={styles.financingTypeContainer_button_subtitle}>{props.buttonSubtitle}</p>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <p className={styles.page_title}>Own it or Use it?</p>
      <p className={styles.page_subtitle}>Please select whether you want to own the product or use it for a short period of time to configure the financing options.</p>

      <div className={styles.useItContainer}>
        <FinancingTypeContainer
          title="I want to own it"
          buttonTitle="Pay in installaments from"
          price={cartTotal/50}
          buttonSubtitle="based on 48 months" 
          selectionFunction={props.selectionFunction}
          variableValue={"Own"}/>
        <FinancingTypeContainer
          title="I want to use it"
          buttonTitle="Use these products from"
          price={cartTotal/60}
          buttonSubtitle="based on 48 months, incl. service contract" 
          selectionFunction={props.selectionFunction}
          variableValue={"Use"} />
      </div>

    </div>
  );
}

function AddOptionsPage({setPage, nextPage}){

  const [insurance, setInsurance] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [iot, setIot] = useState(false);
  
  return (
    <div className={styles.page}>
      <div className={styles.addOptionsHeader}>
        <p className={styles.page_title}>Own it through financing</p>
        <p className={styles.page_subtitle}>Please select the additional services you would like to include with your purchase</p>
      </div>
      <FormGroup className={styles.checkboxGroup}>
        <div className={styles.checkboxContainer}>
          <FormControlLabel
              control={
                <Checkbox checked={insurance} onChange={()=>setInsurance(!insurance)} value="insurance" />
              }
              label="Add property casualty insurance"/>
          <p className={styles.checkboxGroup_price}>$80/month</p>
        </div>
        <div className={styles.checkboxContainer}>
          <FormControlLabel
            control={
              <Checkbox checked={maintenance} onChange={()=>setMaintenance(!maintenance)} value="maintenance" />
            }
            label="Add maintenance" />
            <p className={styles.checkboxGroup_price}>$40/month</p>
        </div>
        <div className={styles.checkboxContainer}>          
          <FormControlLabel
            control={
              <Checkbox checked={iot} onChange={()=>setIot(!iot)} value="iot" />
            }
            label="Add IoT Subscription" />
          <p className={styles.checkboxGroup_price}>$25/month</p>
        </div>
      </FormGroup>
      <button onClick={()=>setPage(nextPage)} className={cn("button", styles.continueButton)}>Continue</button>

    </div>
  )
}

function PaymentTerms(props) {
  const { cartTotal } = useCart();
  const totalPrice = cartTotal + 1500
  const interest = 0.03

  const paymentTerms = ["Monthly", "Quarterly", "Semi-annually", "Annually"];
  const [paymentTerm, setPaymentTerm] = useState(paymentTerms[0]);
  const durationOptions = [12, 24, 36, 48];
  const [duration, setDuration] = useState(durationOptions[3]);
  const downPaymentMin = 0;
  const downPaymentMax = totalPrice;
  const [downPayment, setDownPayment] = useState(downPaymentMax/5);

  const [financeAmount, setFinanceAmount] = useState(0);
  const [paybackAmount, setPaybackAmount] = useState(0);
  const [pricePerTerm, setPricePerTerm] = useState(0);
  const [interestPerTerm, setInterestPerTerm] = useState(0);    

  function calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest){
    const financeAmount = totalPrice - downPayment;
    let numPaymentTerms = 0;
    
    switch(paymentTerm){
      case "Monthly":
        numPaymentTerms = duration;
        break;
      case "Quarterly":
       numPaymentTerms = duration/3;
        break;
      case "Semi-annually":
        numPaymentTerms = duration/6;
        break;
      case "Annually":
        numPaymentTerms = duration/12;
        break;
    }
    let interestPerTerm = financeAmount * interest / numPaymentTerms;
    let paybackAmount = financeAmount / numPaymentTerms;
    let pricePerTerm = paybackAmount + interestPerTerm;


    setFinanceAmount(financeAmount);
    setPaybackAmount(paybackAmount);
    setPricePerTerm(pricePerTerm);
    setInterestPerTerm(interestPerTerm);
  }

  useEffect(()=>{
    calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest);
  }, [totalPrice, downPayment, duration, paymentTerm, interest])


  const handleDownPaymentChange = (newValue) => {
    setDownPayment(newValue);
    calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest);
  };

  const handleDurationChange = (newValue) => {
    setDuration(newValue);
    calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest);
  };

  const handlePaymentTermChange = (newValue) => {
    setPaymentTerm(newValue);
    calculateFinancialTerms(totalPrice, downPayment, duration, paymentTerm, interest);
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
              label="Payment Terms" /></div>
            <div className={styles.paymentRowRight}><Dropdown
              className={styles.dropdown}
              value={duration}
              options={durationOptions}
              setValue={handleDurationChange}
              label="Duration (in months)" /></div>
            </div>
          <FormSlider label="Down Payment" min={downPaymentMin} max={downPaymentMax} value={downPayment} setValue={handleDownPaymentChange} />
        </form>
      </div>
      <div className={styles.paymentTermsResult}>
        <div className={cn(styles.paymentTermsResultLine, styles.lineHighlighted)}>
          <p className={cn(styles.paymentTermsResultLine_title, styles.blackText)}>Financing Amount</p>
          <NumberFormat value={financeAmount} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>}  />
        </div>
        <div className={styles.paymentTermsResultLine}>
          <p className={styles.paymentTermsResultLine_title}>Price per term</p>
          <NumberFormat value={pricePerTerm} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>} />
        </div>
        <div className={styles.paymentTermsResultLine}>
          <p className={styles.paymentTermsResultLine_title}>Payback</p>
          <NumberFormat value={paybackAmount} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>}/>
        </div>
        <div className={styles.paymentTermsResultLine}>
          <p className={styles.paymentTermsResultLine_title}>Interest (3%)</p>
          <NumberFormat value={interestPerTerm} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0}renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>}/>
        </div>
      </div>
      <Link to={{
        pathname: '/checkout',
        search: `?financing=${true}`
      }} ><button className={cn("button", styles.continueButton)}>Continue</button></Link>
    </div>
    );
  }


function UseItPage(props) {
  return (
    <div className={styles.page}>
      <p className={styles.page_title}>Use it through financing</p>
      <p className={styles.page_subtitle}>Configure the options to generate the quote for using the products</p>
      <PaymentTerms />
    </div>
  );
}

function OwnItPage(props) {
  return (
    <div className={styles.page}>
      <p className={styles.page_title}>Own it through financing</p>
      <p className={styles.page_subtitle}>Configure the options to generate the quote for owning the products</p>
      <PaymentTerms />
    </div>
  );
}


const DLLFinancingModal = ({show, setShow}) => {
  const globalState = useContext(store);
  console.log('globalState: ', globalState)

  const [open, setOpen] = useState(show);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [financingType, setFinancingType] = useState(null);

  const [page, setPage] = useState(0);

  function handleFinancingType(type){
    setFinancingType(type);
    if(type === 'Own') setPage(1);
    else setPage(2);
  }


  return (
    <>
      <Modal 
        open={show}
        onClose={handleClose}>
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            <img src="/images/icons/dllSymbol.svg" alt="DLL Logo" />
          </div>
          <div className={styles.modal_body}>
            {page === 0 && <OwnItUseItPage selectionFunction={handleFinancingType}/>}
            {page === 1 && <AddOptionsPage setPage={setPage} nextPage={3}/>}
            {page === 2 && <UseItPage />}
            {page === 3 && <OwnItPage />}
          </div>
        </div>
       </Modal>
    </>
  );
};

export default DLLFinancingModal;