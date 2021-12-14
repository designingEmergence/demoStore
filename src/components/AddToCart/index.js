import React, {useState} from "react";
import styles from "./AddToCart.module.sass";
import Dropdown from "../Dropdown";
import cn from "classnames";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DLLPaymentInfoCard from "../DLLPaymentInfoCard";
import NumberFormat from 'react-number-format';
import {useCart} from 'react-use-cart'


let financingOption = "Own It";
let financingOptions = ["Own It", "Use It"]

function selectFinancingOption(value) {
  console.log('selected', value);
  financingOption = value;
}

const AddToCart = ({item}) => {
  
  const { items, addItem, updateItemQuantity } = useCart();

  let addItemToCart = (itemToAdd) => {
    // This function looks for itemToAdd in the items array and adds it to the cart if it is not already there. If it is already there then it incerments the quantity by 1
    let itemToAddToCart = items.find(item => item.id === itemToAdd.id);
    if (itemToAddToCart) {
      updateItemQuantity(itemToAddToCart.id, itemToAddToCart.quantity + 1);
    } else {
      addItem(itemToAdd);
    }
  }

  return (
    <>
      <div className={styles.addToCartContainer}>
        <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} className={styles.price} />
        <DLLPaymentInfoCard price={item.price}/>
        <Dropdown  
            className={styles.dropdown} 
            value={financingOption} 
            setValue={selectFinancingOption}
            options={financingOptions}/>
        <button onClick={() => addItemToCart(item)} className={cn("button", styles.addToCartButton)}>Add to Cart <AddShoppingCartIcon /></button>
      </div>
    </>
  );
};

export default AddToCart;