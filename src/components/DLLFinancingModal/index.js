import React, {useState} from "react";
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



function OwnItUseItPage(props) {

  function FinancingTypeContainer(props) {
    return (
      <div className={styles.financingTypeContainer}>
        <p className={styles.financingTypeContainer_title}>{props.title}</p>
        <button onClick={()=>props.selectionFunction(props.variableValue)} className={styles.financingTypeContainer_button}>
          <p className={styles.financingTypeContainer_button_title}>{props.buttonTitle}</p>
          <span className={styles.financingTypeContainer_button_price}>{props.price}</span>
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
          price="$0"
          buttonSubtitle="based on 48 months" 
          selectionFunction={props.selectionFunction}
          variableValue={"Own"}/>
        <FinancingTypeContainer
          title="I want to use it"
          buttonTitle="Use these products from"
          price="$0"
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
        <FormControlLabel
          control={
            <Checkbox checked={insurance} onChange={()=>setInsurance(!insurance)} value="insurance" />
          }
          label="Add property casualty insurance"/>
        <FormControlLabel
          control={
            <Checkbox checked={maintenance} onChange={()=>setMaintenance(!maintenance)} value="maintenance" />
          }
          label="Add maintenance" />
        <FormControlLabel
          control={
            <Checkbox checked={iot} onChange={()=>setIot(!iot)} value="iot" />
          }
          label="Add IoT Subscription" />
      </FormGroup>
      <button onClick={()=>setPage(nextPage)} className={cn("button", styles.continueButton)}>Continue</button>

    </div>
  )
}

function PaymentTerms(props) {

  const paymentTerms = ["Monthly", "Quarterly", "Semi-annually", "Annually"];
  const [paymentTerm, setPaymentTerm] = useState(paymentTerms[1]);
  const durationOptions = [12, 24, 36, 48];
  const [duration, setDuration] = useState(durationOptions[1]);
  const downPaymentMin = 0;
  const downPaymentMax = 100;
  const [downPayment, setDownPayment] = useState(downPaymentMin);

  return (
    <div className={styles.paymentTerms}>
      <div className={styles.paymentTermsConfig}>
        <form>
          <div className={styles.paymentTermsRow}>
            <div className={styles.paymentRowLeft}><Dropdown
              className={styles.dropdown}
              value={paymentTerm}
              options={paymentTerms}
              setValue={setPaymentTerm}
              label="Payment Terms" /></div>
            <div className={styles.paymentRowRight}><Dropdown
              className={styles.dropdown}
              value={duration}
              options={durationOptions}
              setValue={setDuration}
              label="Duration (in months)" /></div>
            </div>
          <FormSlider label="Down Payment" min={downPaymentMin} max={downPaymentMax} value={downPaymentMax/5} setValue={setDownPayment} />
        </form>
      </div>
      <div className={styles.paymentTermsResult}>
        <div className={cn(styles.paymentTermsResultLine, styles.lineHighlighted)}>
          <p className={cn(styles.paymentTermsResultLine_title, styles.blackText)}>Financing Amount</p>
          <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>}  />
        </div>
        <div className={styles.paymentTermsResultLine}>
          <p className={styles.paymentTermsResultLine_title}>Monthly Price</p>
          <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>} />
        </div>
        <div className={styles.paymentTermsResultLine}>
          <p className={styles.paymentTermsResultLine_title}>Payback</p>
          <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>}/>
        </div>
        <div className={styles.paymentTermsResultLine}>
          <p className={styles.paymentTermsResultLine_title}>Interest (3%)</p>
          <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.paymentTermsResultLine_amount}>{value}</p>}/>
        </div>
      </div>
      <button className={cn("button", styles.continueButton)}>Continue</button>
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


const DLLFinancingModal = ({active}) => {
  const [open, setOpen] = useState(active);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        open={open}
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