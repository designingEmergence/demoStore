import React, {useState} from "react";
import styles from "./BagOverview.module.sass";
import Catalog from '../../data/catalog.js'
import Counter from '../Counter'
import cn from "classnames";
import DLLPaymentInfoCard from '../DLLPaymentInfoCard'
import { useNavigate } from "react-router";
import NumberFormat from 'react-number-format';


let itemsInBag = [Catalog[0], Catalog[1]];

let subTotal = itemsInBag.reduce((acc, item) => {
    return acc + item.price;
}, 0);

let shippingPrice = 0;

function setItemAmount(amount) {
  console.log(amount);
}

function Items(props) {
  let itemList = props.items
  return itemList.map((item, index) => {
    return (
      <div className={styles.bagOverviewItemContainer}>
        <div className={styles.bagOverviewItem} key={index}>
          <img src={item.image} className={styles.itemImage} alt={item.name}/>
          <div className={styles.itemDetails}>
            <p className={styles.itemName} >{item.name}</p>
            <NumberFormat value={item.price}  displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.itemPrice}>{value}</p>} />
          </div>
        </div>
        <Counter value={1} className={styles.itemAmount} iconMinus="minus" setValue={setItemAmount} iconPlus="plus" />
      </div>
    )
  })
}

const BagOverview = ({showPaymentOptions=false}) => {
  let navigate = useNavigate();
  return (
    <>
      <div className={styles.bagOverviewContainer}>
        <p className={styles.bagOverviewTitle}>Shopping Bag</p>
        <div className={styles.bagOverviewItems}>
          <Items items={itemsInBag}/>
        </div>
        <hr className={styles.bagOverviewDivider}/>
        <div className={styles.bagOverviewLineItem}>
          <p className={styles.bagOverviewLineItemText}>Subtotal</p>
          <NumberFormat value={subTotal}  displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.bagOverviewLineItemPrice}>{value}</p>} />
        </div>  
        <div className={styles.bagOverviewLineItem}>
          <p className={styles.bagOverviewLineItemText}>Shipping</p>
          <NumberFormat value={shippingPrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.bagOverviewLineItemPrice}>{value}</p>} />
        </div>
        <div className={cn(styles.total,styles.bagOverviewLineItem)}>
          <p className={cn(styles.totalText,styles.bagOverviewLineItemText)}>Total</p>
          <NumberFormat value={subTotal + shippingPrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.bagOverviewLineItemPrice}>{value}</p>} />
        </div>

        {showPaymentOptions && <div className={styles.bagOverviewPaymentOptions}>
          <DLLPaymentInfoCard price={subTotal + shippingPrice}/>
          <button onClick={()=> navigate('/checkout')} className={cn("button", styles.fullWidthButton, styles.checkoutButton)}>Checkout</button>
          <button onClick={()=> navigate('/checkout')} className={cn("button", styles.fullWidthButton, styles.dllButton)}>DLL Financing Option</button>
          </div>}
      </div>
    </>
  );
};

export default BagOverview;