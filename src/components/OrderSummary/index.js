import React from "react";
import cn from "classnames";
import styles from "./OrderSummary.module.sass";

const orderSummary = {
    shippingInfo: {
        companyName: 'Company Name',
        name: 'Name',
        email: 'E-mail',
        address: 'Address',
        country: 'Country'
    },
    billingDetails: {
        companyName: 'Company Name',
        name: 'Name',
        email: 'E-mail',
        address: 'Address',
        country: 'Country'
    },
    payment: {
        paymentMethod: 'Bank **** **** **** 99',
        purchaseOrderNumber: 'MAR8T01'
    }
}

const OrderSummary = () => {
  return (
    <>
        <hr className={styles.hr}/>
        <div className={styles.summaryContainer}>
                <h3 className={styles.summaryTitle}>Order summary</h3>
                <div className={styles.summary}>
                    <div>
                        <h4 className={styles.summarySectionTitle}>Shipping information</h4>
                        <div>
                            <p>{orderSummary.shippingInfo.companyName}</p>
                            <p>{orderSummary.shippingInfo.name}</p>
                            <p>{orderSummary.shippingInfo.email}</p>
                            <p>{orderSummary.shippingInfo.address}</p>
                            <p>{orderSummary.shippingInfo.country}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className={styles.summarySectionTitle}>Billing details</h4>
                        <div>
                            <p>{orderSummary.billingDetails.companyName}</p>
                            <p>{orderSummary.billingDetails.name}</p>
                            <p>{orderSummary.billingDetails.email}</p>
                            <p>{orderSummary.billingDetails.address}</p>
                            <p>{orderSummary.billingDetails.country}</p>
                        </div>
                    </div>
                    <div className={styles.payment}>
                        <div>
                            <h4 className={styles.summarySectionTitle}>Payment method</h4>
                            <p>{orderSummary.payment.paymentMethod}</p>
                        </div>
                        <div>
                            <h4 className={styles.summarySectionTitle}>Purchase order number</h4>
                            <p>{orderSummary.payment.purchaseOrderNumber}</p>
                        </div>
                    </div>
                </div>
        </div>
        <hr/>
    </>
  );
};

export default OrderSummary;
