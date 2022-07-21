import React, {useState} from "react";
import styles from "./CheckoutForm.module.sass";
import TextInput from "../TextInput";
import cn from "classnames";


const CheckoutForm = () => {
  return (
    <>
      <p className={styles.formTitle}>Billing Address</p>
      <form className={styles.checkoutForm}>
        <TextInput className={cn(styles.formRow, styles.checkoutForm__email)} label="Email" type="text"  />
        <TextInput className={cn(styles.formRow, styles.checkoutForm__email)} label="Company name" type="text"  />
        <TextInput className={cn(styles.formRow, styles.checkoutForm__email)} label="VAT number" type="text"  />
        <TextInput className={cn(styles.checkoutForm__half, styles.checkoutFormLeft)} label="First name" type="text"  />
        <div className={cn(styles.formRow, styles.checkoutFormGroup)}>
        <TextInput className={cn(styles.checkoutForm__half, styles.checkoutFormLeft)} label="Middle name" type="text"  />
        <TextInput className={cn(styles.checkoutForm__half, styles.checkoutFormRight)} label="Last name" type="text"  />
        </div>
        <TextInput className={cn(styles.formRow,styles.checkoutForm__streetAddress)} label="Street address" type="text"  />
        <div className={cn(styles.formRow, styles.checkoutFormGroup)}>
          <TextInput className={cn(styles.checkoutForm__half, styles.checkoutFormLeft)} label="State" type="text"  />
          <TextInput className={cn(styles.checkoutForm__half, styles.checkoutFormRight)}label="Zip" type="text"  />
        </div>
        <TextInput className={cn(styles.formRow, styles.checkoutForm__apartment)} label="Apartment, suite (Optional)" type="text"  />
        <TextInput className={cn(styles.formRow, styles.checkoutForm__city)} label="City" type="text"  />
        <TextInput className={cn(styles.formRow, styles.checkoutForm__phone)} label="Phone" type="text"  />
      </form>
    </>
  );
};

export default CheckoutForm;