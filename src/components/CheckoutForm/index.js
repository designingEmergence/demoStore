import React, {useState} from "react";
import styles from "./CheckoutForm.module.sass";
import TextInput from "../TextInput";
import cn from "classnames";


const CheckoutForm = () => {
  return (
    <>
      <p className={styles.formTitle}>Billing Address</p>
      <form className={styles.checkoutForm}>
        <TextInput className={cn(styles.formRow, styles.checkoutForm__email)} label="email" type="text"  />
        <div className={cn(styles.formRow, styles.checkoutFormGroup)}>
          <TextInput className={cn(styles.checkoutForm__half, styles.checkoutFormLeft)} label="First Name" type="text"  />
          <TextInput className={cn(styles.checkoutForm__half, styles.checkoutFormRight)} label="Last Name" type="text"  />
        </div>
        <TextInput className={cn(styles.formRow,styles.checkoutForm__streetAddress)} label="Street Address" type="text"  />
        <div className={cn(styles.formRow, styles.checkoutFormGroup)}>
          <TextInput className={cn(styles.checkoutForm__half, styles.checkoutFormLeft)} label="State" type="text"  />
          <TextInput className={cn(styles.checkoutForm__half, styles.checkoutFormRight)}label="Zip" type="text"  />
        </div>
        <TextInput className={cn(styles.formRow, styles.checkoutForm__apartment)} label="Apartment, Suite (optional)" type="text"  />
        <TextInput className={cn(styles.formRow, styles.checkoutForm__city)} label="City" type="text"  />
        <TextInput className={cn(styles.formRow, styles.checkoutForm__phone)} label="Phone" type="text"  />
      </form>
    </>
  );
};

export default CheckoutForm;