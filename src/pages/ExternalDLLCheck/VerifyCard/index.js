import React, {useState, useEffect} from "react";
import styles from "./VerifyCard.module.sass";
import TextInput from "../../../components/TextInput";
import cn from "classnames";
import { useNavigate } from "react-router";
import { Checkbox, Grid } from "@mui/material";
import DocuSign from "../../../components/DocSign";


function VerifyDetails({setPage, nextPage}) {
  return (
    <div className={styles.pageContent}>
      <p className={styles.title}>Contract details</p>
      <p className={styles.subtitle}>Please confirm that the pre-filled details are correct. We will create a contract with the following details:</p>
      <div className={styles.VerifyDetails}>
        <button className={styles.changeDetails}>Change</button>
        <div>
          <p>Testperson approved</p>
          <p>+21025567951</p>
          <p>youremail@gmail.com</p>
        </div>
        <br/>
        <div>
          <p>Company name</p>
          <p>629 N High St, 4</p>
          <p>Columbus 43215-2929 CH</p>
        </div>
      </div>
      <div className={styles.confirmation}>
        <Checkbox sx={{
            color: '#000000',
            '&.Mui-checked': {
                color: '#000000',
            },
        }} />
        <p>I confirm that the information is correct</p>
      </div>
      {/* <div className={styles.VerifyDetails__inputs}>
        <TextInput placeholder="Phone Number" />
        <TextInput placeholder="Company VAT Number" />
      </div> */}
      <button onClick={()=>setPage(nextPage)} className={cn("button", styles.continueButton)}>Continue</button>
    </div>
  )
}

function SignDocument({setPage, nextPage}) {

  const [hasViewed, setHasViewed] = useState(false);

  function openFile(){
    window.open('/files/contract 1.pdf', '_blank').focus();
  }

  return (
    <div className={styles.pageContent}>
      <p className={styles.title}>Sign the contract</p>
      <p className={styles.subtitle}>Please read through the contract and click the button to e-sign</p>
      <div className={styles.pageIcon}>
        <img src="/images/icons/sign-icon1.svg" alt="Sign Icon" />
      </div>
      <button onClick={()=>{openFile(); setHasViewed(true)}} className={cn("button button-stroke", styles.viewDocumentButton)}>View Document</button>
      <button disabled={!hasViewed} onClick={()=>setPage(nextPage)} className={cn("button button-stroke", styles.continueButton)}>e-Sign Document</button>
    </div>
  )
}

function ConfirmPage({nextPage}) {
  let navigate = useNavigate();

  function redirectWithDelay(path, delay) {
    setTimeout(() => {
      navigate(path);
    } , delay);
  }

  // useEffect(() => {
  //   redirectWithDelay("/thankyou", 5000);
  // });

  return (
    <div className={styles.pageContent}>
      <p className={styles.title}>We received your signed contract</p>
      <p className={styles.subtitle}>Note that this is not a confirmation yet. We will do a verification check on the documents you rpovided. If everything is correct, you will receive an email with your contract and shipping information. This will take up to 1 working day.</p>
      <div className={styles.pageIcon}>
        <img src="/images/icons/confirm-icon.svg" alt="Check Icon" />
      </div>
      <button onClick={()=>{nextPage()}} className={cn("button button-stroke", styles.viewDocumentButton)}>Continue</button>
    </div>
  )
}

const SignatureAdoption = ({setPage, nextPage}) => {

  const [name, setName] = useState('John Doe');
  const [initials, setInitials] = useState('JD');
  const [id, setId] = useState('D4AA6F4A6A24424...');

  const fonts = ['Italianno', 'JimNightshade', 'MeowScript'];
  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  return (
    <Grid container columnSpacing={{ xs: 2 }}>
      <Grid item xs={7}>
          <h2 className={styles.adoptSignatureTitle}>Adopt your Signature</h2>
          <p className={styles.adoptSignatureText}>By clicking Adopt, I agree that the signature and initials will be the electronic representation of my signature and initials for all purposes when I (or my agent) use them on documents, including legally binding contracts - Just the same as a pen-and-paper signature or initial.</p>
          <h3 className={styles.nameConfirm}>Confirm you name, initials, and signature.</h3>
          <div>
            <Grid container columnSpacing={{ xs: 1 }}>
              <Grid item xs={8}>
                <TextInput label="Your full name" placeholder="" onChange={(e)=>setName(e.target.value)} value={name}/>
              </Grid>
              <Grid item xs={4}>
                <TextInput label="Your initials" placeholder="" onChange={(e)=>setInitials(e.target.value)} value={initials} />
              </Grid>
            </Grid>
            <Grid container>
              <DocuSign id={id} name={name} initials={initials} font={selectedFont}/>
              <button onClick={()=>setPage(nextPage)} className={cn('button', styles.fullWidthButton)}>Adopt and sign</button>
            </Grid>
          </div>
      </Grid>
      <Grid item xs={5} className={styles.signatureList}>
        {fonts.map((font, index)=>{
          return (
            <div key={index} className={styles.signatureSelect} onClick={()=>{setSelectedFont(font)}}>
            <DocuSign id={id} name={name} minimal={true} font={font}/>
            <div className={styles.signatureCheckbox}>
              <Checkbox
              checked={selectedFont === font}
              sx={{
                  color: '#000000',
                  '&.Mui-checked': {
                      color: '#000000',
                  },
              }} />
            </div>
          </div>
          )
        })}
      </Grid>
    </Grid>
  )
}

const VerifyCard = ({nextPage}) => {
  const [page, setPage] = useState(0);

  return (
    <>
      <div className={styles.card}>
          {page === 0 && <VerifyDetails setPage={setPage} nextPage={1} />}
          {page === 1 && <SignDocument setPage={setPage} nextPage={2} />}
          {page === 2 && <SignatureAdoption setPage={setPage} nextPage={3} />}
          {page === 3 && <ConfirmPage nextPage={nextPage} />}
      </div>
    </>
  );
};

export default VerifyCard;