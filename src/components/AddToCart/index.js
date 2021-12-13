import React, {useState} from "react";
import styles from "./AddToCart.module.sass";
import Dropdown from "../Dropdown";
import cn from "classnames";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DLLPaymentInfoCard from "../DLLPaymentInfoCard";


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
        <DLLPaymentInfoCard price={price}/>
        <Dropdown  
            className={styles.dropdown} 
            value={financingOption} 
            setValue={selectFinancingOption}
            options={financingOptions}/>
        <button className={cn("button", styles.addToCartButton)}>Add to Cart <AddShoppingCartIcon /></button>
      </div>
    </>
  );
};

export default AddToCart;