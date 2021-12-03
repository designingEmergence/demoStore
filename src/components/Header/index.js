import React, {useState} from "react";
import styles from "./Header.module.sass";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = ({}) => {

  return (
    <>
      <div className={styles.header}>
        <img className={styles.logo} src='/images/logo.png' alt="logo"/>
        <ShoppingCartIcon className={styles.cart}/>
      </div>
    </>
  );
};
export default Header;