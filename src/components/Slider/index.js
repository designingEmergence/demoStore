import React, {useState} from "react";
import styles from "./Slider.module.sass";
import Slider from '@mui/material/Slider';
import NumberFormat from 'react-number-format';

const FormSlider = ({className, label, value, setValue, min, max, empty}) => {

  const [sliderValue, setSliderValue] = useState(value);

  function handleChange(event, newValue) {
    setValue(newValue);
    setSliderValue(newValue);
  }

  return (
    <>
      <div className={styles.sliderHeader}>
        {label && <span className={styles.label}>{label}</span>}
        {value && <NumberFormat  value={sliderValue} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span className={styles.value}>{value}</span>}/>}
      </div>
      <Slider value={value} onChange={handleChange}  step={100} min={min} max={max} sx={{
        color: '#000000',
        height: '2px',
        '& .MuiSlider-thumb': {
          outline: '4px solid #ffffff',
        },
        '& .MuiSlider-thumb:hover': {
          boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.1)'
        },
        '& .Mui-active': {
          boxShadow: '0px 0px 0px 14px rgba(0,0,0,0.1)'
        },
        '& :hover': {
          color: '#000000'
        }
      }}/>
    </>
  );
};

export default FormSlider;