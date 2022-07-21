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
  financingOption = value;
}

const AddToCart = ({item}) => {
  
  const { items, addItem, updateItemQuantity } = useCart();

  let addItemToCart = (itemToAdd) => {
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

        <button onClick={() => addItemToCart(item)} className={cn("button", styles.addToCartButton)}>Add to Cart 
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14.9999 17.5H4.99992C4.07909 17.5 3.33325 16.7541 3.33325 15.8333V7.49998C3.33325 6.57915 4.07909 5.83331 4.99992 5.83331H14.9999C15.9208 5.83331 16.6666 6.57915 16.6666 7.49998V15.8333C16.6666 16.7541 15.9208 17.5 14.9999 17.5Z" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M7.5 5C7.5 3.61917 8.61917 2.5 10 2.5C11.3808 2.5 12.5 3.61917 12.5 5" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M12.4999 5.83333V5" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.49992 5.83333V5" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </button>
      </div>
    </>
  );
};

export default AddToCart;