import React, {useState, useEffect} from "react";
import styles from "./VerifyCard.module.sass";
import TextInput from "../../../components/TextInput";
import cn from "classnames";
import { useNavigate } from "react-router";


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

const VerifyCard = () => {

  const [page, setPage] = useState(0);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="/images/icons/dllSymbol.svg" alt="DLL Logo" />
        </div>
          {page === 0 && <VerifyDetails setPage={setPage} nextPage={1} />}
          {page === 1 && <SignDocument setPage={setPage} nextPage={2} />}
          {page === 2 && <ConfirmPage />}
      </div>
    </>
  );
};

export default VerifyCard;