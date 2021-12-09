import React, {useState} from "react";
import styles from "./BagOverview.module.sass";
import Catalog from '../../data/catalog.js'
import Counter from '../Counter'
import cn from "classnames";

let itemsInBag = [Catalog[0], Catalog[1], Catalog[2]];

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
            <p className={styles.itemPrice} >{item.price}</p>
          </div>
        </div>
        <Counter value={1} className={styles.itemAmount} iconMinus="minus" setValue={setItemAmount} iconPlus="plus" />
      </div>
    )
  })
}

const BagOverview = (showPaymentOptions) => {
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
          <p className={styles.bagOverviewLineItemPrice}>{subTotal}</p>
        </div>  
        <div className={styles.bagOverviewLineItem}>
          <p className={styles.bagOverviewLineItemText}>Shipping</p>
          <p className={styles.bagOverviewLineItemPrice}>{shippingPrice}</p>
        </div>
        <div className={cn(styles.total,styles.bagOverviewLineItem)}>
          <p className={cn(styles.totalText,styles.bagOverviewLineItemText)}>Total</p>
          <p className={cn(styles.bagOverviewLineItemPrice)}>{subTotal + shippingPrice}</p>
        </div>
      </div>
    </>
  );
};

export default BagOverview;