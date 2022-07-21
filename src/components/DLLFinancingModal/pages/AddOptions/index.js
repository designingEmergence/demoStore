import React, {useState, useContext} from "react";
import styles from "./AddOptions.module.sass";
import cn from "classnames";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { store } from "../../../../store";
import copy from "../../../../data/copy";


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
        <p className={styles.page_title}><span className={styles.own_it}>Own it</span> through financing</p>
        <p className={styles.page_subtitle}>Please select the additional services you would like to include with your purchase</p>
      </div>
      <FormGroup className={styles.checkboxGroup}>
        <div className={styles.checkboxContainer}>
          <FormControlLabel
              control={
                <Checkbox checked={insurance} onChange={()=>setInsurance(!insurance)} value="insurance" sx={{
                  color: '#000000',
                  '&.Mui-checked': {
                      color: '#000000',
                  },
              }} />
              }
              label={copy.extras.option1.text}/>
          <p className={styles.checkboxGroup_price}>{copy.extras.option1.price}</p>
        </div>
        <div className={styles.checkboxContainer}>
          <FormControlLabel
            control={
              <Checkbox checked={maintenance} onChange={()=>setMaintenance(!maintenance)} value="maintenance" sx={{
                color: '#000000',
                '&.Mui-checked': {
                    color: '#000000',
                },
            }} />
            }
            label={copy.extras.option2.text}/>
            <p className={styles.checkboxGroup_price}>{copy.extras.option2.price}</p>
        </div>
        <div className={styles.checkboxContainer}>          
          <FormControlLabel
            control={
              <Checkbox checked={iot} onChange={()=>setIot(!iot)} value="iot" sx={{
                color: '#000000',
                '&.Mui-checked': {
                    color: '#000000',
                },
            }} />
            }
            label={copy.extras.option3.text} />
          <p className={styles.checkboxGroup_price}>{copy.extras.option3.price}</p>
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