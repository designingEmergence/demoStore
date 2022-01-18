import React, {useState} from "react";
import styles from "./BagOverview.module.sass";
import Counter from '../Counter'
import cn from "classnames";
import DLLPaymentInfoCard from '../DLLPaymentInfoCard'
import { useNavigate } from "react-router";
import NumberFormat from 'react-number-format';
import { useCart } from "react-use-cart";
import DLLFinancingModal from "../DLLFinancingModal";


let shippingPrice = 50;

function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  if(isEmpty) return <div>Your cart is empty</div>;

  return (
    <>
    {items.map((item) => {
      return (
        <div className={styles.bagOverviewItemContainer}>
          <div className={styles.bagOverviewItem} key={item.id}>
            <img src={item.image} className={styles.itemImage} alt={item.name}/>
            <div className={styles.itemDetails}>
              <p className={styles.itemName} >{item.name}</p>
              <NumberFormat value={item.itemTotal}  displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.itemPrice}>{value}</p>} />
            </div>
          </div>
          <Counter value={item.quantity} className={styles.itemAmount} id={item.id} iconMinus="minus" setValue={updateItemQuantity} iconPlus="plus" />
        </div>
      )
    })}
    </>
  );
}

const BagOverview = ({showPaymentOptions=false}) => {
  let navigate = useNavigate();
  const { cartTotal } = useCart();
  let [showDLLFinancing, setShowDLLFinancing] = useState(false);

  return (
    <>
      <div className={styles.bagOverviewContainer}>
        
        <p className={styles.bagOverviewTitle}>Shopping Bag</p>
        <div className={styles.bagOverviewItems}>
          <Cart />
        </div>
        <hr className={styles.bagOverviewDivider}/>
        <div className={styles.bagOverviewLineItem}>
          <p className={styles.bagOverviewLineItemText}>Subtotal</p>
          <NumberFormat value={cartTotal}  displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.bagOverviewLineItemPrice}>{value}</p>} />
        </div>  
        <div className={styles.bagOverviewLineItem}>
          <p className={styles.bagOverviewLineItemText}>Shipping</p>
          <NumberFormat value={shippingPrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.bagOverviewLineItemPrice}>{value}</p>} />
        </div>
        <div className={cn(styles.total,styles.bagOverviewLineItem)}>
          <p className={cn(styles.totalText,styles.bagOverviewLineItemText)}>Total</p>
          <NumberFormat value={cartTotal + shippingPrice}  displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.bagOverviewLineItemPrice}>{value}</p>} />
        </div>

        {showPaymentOptions && <div className={styles.bagOverviewPaymentOptions}>
          <DLLPaymentInfoCard price={cartTotal + shippingPrice}/>
          <button onClick={()=> navigate('/checkout')} className={cn("button", styles.fullWidthButton, styles.checkoutButton)}>Checkout</button>
          <button onClick={()=> setShowDLLFinancing(true)} className={cn("button", styles.fullWidthButton, styles.dllButton)}>DLL Financing Options</button>
          <DLLFinancingModal show={showDLLFinancing} setShow={setShowDLLFinancing}/>
          </div>}
      </div>
    </>
  );
};

export default BagOverview;