import React, {useState, useEffect} from "react";
import styles from "./FinanceAndVerifyCard.module.sass";
import TextInput from "../../../components/TextInput";
import cn from "classnames";
import { useNavigate } from "react-router";
import PaymentTerms from "../../../components/DLLFinancingModal/pages/PaymentTerms";
import OwnItUseIt from "../../../components/DLLFinancingModal/pages/OwnItUseIt";
import AddOptions from "../../../components/DLLFinancingModal/pages/AddOptions";
import Icon from "../../../components/Icon";






function VerifyDetails({setPage, nextPage}) {
  return (
    <div className={styles.pageContent}>
      <p className={styles.title}>Verify your details</p>
      <p className={styles.subtitle}>To sign the document, we need to verify it’s you. Enter your mobile phone number company VAT number.</p>
      <div className={styles.VerifyDetails__inputs}>
        <TextInput placeholder="Phone Number" />
        <TextInput placeholder="Company VAT Number" />
      </div>
      <button onClick={()=>setPage(nextPage)} className={cn("button", styles.continueButton)}>Continue</button>
    </div>
  )
}

function SignDocument({setPage, nextPage}) {
  return (
    <div className={styles.pageContent}>
      <p className={styles.title}>Sign the contract</p>
      <p className={styles.subtitle}>Please read through the contract and click the button to e-sign</p>
      <div className={styles.pageIcon}>
        <img src="/images/icons/sign-icon.svg" alt="Sign Icon" />
      </div>
      <button onClick={()=>setPage(nextPage)} className={cn("button", styles.continueButton)}>e-Sign Document</button>
    </div>
  )
}

function ConfirmPage() {
  let navigate = useNavigate();

  function redirectWithDelay(path, delay) {
    setTimeout(() => {
      navigate(path);
    } , delay);
  }

  useEffect(() => {
    redirectWithDelay("/thankyou", 5000);
  });

  return (
    <div className={styles.pageContent}>
      <p className={styles.title}>Contract Signed</p>
      <p className={styles.subtitle}>You have successfully signed the contract.</p>
      <div className={styles.pageIcon}>
        <img src="/images/icons/confirm-icon.svg" alt="Check Icon" />
      </div>
      <div className={styles.ConfirmPage__countdown}>
        <p className={styles.redirectMessage}>Redirecting to the Demostore</p>
        <img className={styles.redirectIcon} src="/images/icons/redirect-icon.svg" alt="Redirect Icon" />
      </div>
    </div>
  )
}

const FinanceAndVerifyCard = () => {

  function UseItPage() {
    return (
      <div className={styles.page}>
        <p className={styles.page_title}>Use it through financing</p>
        <p className={styles.page_subtitle}>Configure the options to generate the quote for using the products</p>
        <PaymentTerms linkToCheckout ={false} setPage={setPage} nextPage={4}/>
      </div>
    );
  }
  
  function OwnItPage() {
    return (
      <div className={styles.page}>
        <p className={styles.page_title}>Own it through financing</p>
        <p className={styles.page_subtitle}>Configure the options to generate the quote for owning the products</p>
        <PaymentTerms linkToCheckout ={false} setPage={setPage} nextPage={4} />
      </div>
    );
  }
  
  const [page, setPage] = useState(0);
  const [financingType, setFinancingType] = useState(null);

  function handleFinancingType(type){
    setFinancingType(type);
    if(type === 'Own') setPage(1);
    else setPage(2);
  }

  function handlePreviousPage(){
    if (page === 1) setPage(0);
    else if (page === 2) setPage(0);
    else if (page === 3) setPage(1);
    else if (page === 4) setPage(0);
    else if (page === 5) setPage(4);
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          {(page != 0 || 6) && <button onClick={handlePreviousPage}><Icon name="arrow-left" size="16" className={styles.arrowLeft} /></button>}
          <img  src="/images/icons/dllSymbol.svg" alt="DLL Logo" />
        </div>
          {page === 0 && <OwnItUseIt selectionFunction={handleFinancingType}/>}
          {page === 1 && <AddOptions setPage={setPage} nextPage={3}/>}
          {page === 2 && <UseItPage />}
          {page === 3 && <OwnItPage />}
          {page === 4 && <VerifyDetails setPage={setPage} nextPage={5} />}
          {page === 5 && <SignDocument setPage={setPage} nextPage={6} />}
          {page === 6 && <ConfirmPage />}
      </div>
    </>
  );
};

export default FinanceAndVerifyCard;