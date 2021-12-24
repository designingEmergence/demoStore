import React, {useState, useContext} from "react";
import styles from "./AddOptions.module.sass";
import cn from "classnames";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { store } from "../../../../store";

const AddOptions = ({setPage, nextPage}) =>{
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [insurance, setInsurance] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [iot, setIot] = useState(false);

  function dispatchOptions(){
    let extras = []
    if(insurance) extras.push({name: 'insurance', price: 80});
    if(maintenance) extras.push({name: 'maintenance', price: 40});
    if(iot) extras.push({name: 'iot', price: 25});
    console.log('extras: ', extras)
    dispatch({type: 'SET_EXTRAS', payload: extras});
  }
 
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
      <button onClick={()=>{
        dispatchOptions();
        setPage(nextPage)
      }} className={cn("button", styles.continueButton)}>Continue</button>

    </div>
  )
}

export default AddOptions;