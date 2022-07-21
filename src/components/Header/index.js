import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.sass";
import { Badge, Grid, Modal, Stack } from '@mui/material';
import BagOverview from '../BagOverview';
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import CustomSwitch from "../CustomSwitch";
import TextInput from "../TextInput";
import cn from 'classnames';
import Dropdown from "../Dropdown";
import { store } from "../../store";

const Header = ({ }) => {
  const ref = useRef();
  let [showBag, setShowBag] = useState(false);

  useOnClickOutside(ref, () => setShowBag(false));
  const { pathname } = useLocation();
  const { totalItems } = useCart();

  const [show, showModal] = useState(false);

  useEffect(() => {
    setShowBag(false);
  }, [pathname])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/"><p className={styles.logoBlack}>Demostore</p></Link>
          <Stack direction="row" spacing="24px">
            <button className="button-secondary" onClick={()=>{showModal(true)}}>Sign in</button>
            <button onClick={() => {
              setShowBag(!showBag);
            }
            } >
              <Badge badgeContent={totalItems} color="primary">
              <img src="images/icons/shopping-bag.svg" />
              </Badge>
            </button>
          </Stack>
          {showBag && <div className={styles.bagOverview} ><BagOverview showPaymentOptions={true} setShowBag={setShowBag}/></div>}
          <LoginModal show={show} handleClose={showModal}/>
        </div>
      </div>
    </>
  );
};

function useOnClickOutside(ref, handler) {
  React.useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },
    [ref, handler]
  );
}

const LoginModal = ({show, handleClose}) => {
  const options = ['Yes','No'];
  const [step, setStep] = useState(0);
  
  const { state, dispatch } = useContext(store);
  const login = state.login;
  const [email, setEmail] = useState(login.email);
  const [isSignator, setIsSignatory] = useState(login.isSignator);
  const [signatoryName, setSignatoryName] = useState(login.signatoryName);
  const [signatoryEmail, setSignatoryEmail] = useState(login.signatoryEmail);
  const [rememberMe, setRememberMe] = useState(login.rememberMe);

  const hideModal = () => {
    handleClose(false);
    setStep(0);
  };

  function setLoginDetails() {
    const loginConfig = {
      email: email,
      signatoryName: signatoryName,
      signatoryEmail: signatoryEmail,
      isSignator: isSignator,
      rememberMe: false
    };
    console.log(loginConfig);
    dispatch({
      type: "SET_LOGIN",
      payload: loginConfig
    })
  }

  return(
      <Modal
      open={show}
      onClose={hideModal}>
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <button onClick={hideModal}><Icon name="close" size="24" className={styles.close} /></button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modal_body}>
                {step === 0 ? 
                <>
                  <h1>Sign in</h1>
                  <p className={styles.createAccount}>Need an account? <a href="">Create account</a></p>
                  <TextInput className={cn(styles.formRow, styles.checkoutForm__email)} label="Email address or phone number" type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                  <Dropdown className={styles.dropdown} label={'Are you also signatory?'} options={options} setValue={setIsSignatory} value={isSignator} onChange={(e)=>{setIsSignatory(e.target.value)}}/>
                  {
                    isSignator === 'Yes' ?
                    <>
                      <p className={styles.requiredText}>Please provide email and name of signatory</p>
                      <TextInput className={cn(styles.formRow, styles.checkoutForm__email)} label="Name of signatory" type="text" value={signatoryName} onChange={(e)=>{setSignatoryName(e.target.value)}} />
                      <TextInput className={cn(styles.formRow, styles.checkoutForm__email)} label="Email address of signatory" type="text" value={signatoryEmail} onChange={(e)=>{setSignatoryEmail(e.target.value)}} />
                    </> : ''
                  }
                  <Grid item >
                    <div className={styles.rememberMe}>
                      <Grid container>
                        <Grid item xs={11}>
                          <h3>Remember me</h3>
                        </Grid>
                        <Grid item xs={1}>
                          <CustomSwitch/>
                        </Grid>
                      </Grid>
                    </div>
                    <Grid item xs={12}>
                      <button className={cn('button', styles.fullWidthButton)} onClick={()=>{setStep(1)}}>Continue</button>
                    </Grid>
                  </Grid>
                </> : ''}
                {
                  step === 1 ? 
                  <>
                    <h1>Confirm your email address</h1>
                    <p>We have sent a code to {email ? email : 'youremail@gmail.com'}. <button className={styles.change_button} onClick={()=>setStep(0)}>Change</button></p>
                    <TextInput className={cn(styles.formRow, styles.checkoutForm__email, styles.verificationNumberField)} label="Verification number" type="text"  />
                    <p>Email not received? Please check your spam/junk folder, or resend it.</p>
                    <p className={styles.resendText}>resend email in 04:52</p>
                    <Grid item xs={12}>
                      <button className={cn('button', styles.fullWidthButton)} onClick={()=>{hideModal(); setLoginDetails();}}>Submit</button>
                    </Grid>
                  </> : ''
                }
              </div>
            </div>
        </div>
    </Modal>
  )
}


export default Header;