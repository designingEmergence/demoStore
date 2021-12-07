import React, {useState} from "react";
import styles from "./AddToCart.module.sass";
import Dropdown from "../Dropdown";
import cn from "classnames";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function calculatePrice(price) {
  return price/4+ price*0.2;
}


let financingOption = "Own It";
let financingOptions = ["Own It", "Use It"]

function selectFinancingOption(value) {
  console.log('selected', value);
  financingOption = value;
}



const AddToCart = ({price}) => {
  return (
    <>
      <div className={styles.addToCartContainer}>
        <p className={styles.price}>{price}</p>
        <div className={styles.dllPayment}>
          <img src="/images/icons/paypal.svg" alt="dll" />
          <div className={styles.dllPaymentTextColumn}>
            <p className={styles.dllPaymentText}>4 interest free payments of {calculatePrice(price)}</p>
            <p className={styles.dllPaymentText, styles.learnMore}>Learn More</p>
          </div>
          <Dropdown  
            className={styles.dropdown} 
            value={financingOption} 
            setValue={selectFinancingOption}
            options={financingOptions}/>
        </div>
        <button className={cn("button", styles.addToCartButton)}>Add to Cart <AddShoppingCartIcon /></button>
      </div>
    </>
  );
};

export default AddToCart;