import React, {useState} from "react";
import styles from "./Header.module.sass";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BagOverview from '../BagOverview';
import { Link } from "react-router-dom";

const Header = ({}) => {

  let [showBag, setShowBag] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <Link to="/"><p className={styles.logoBlack}>Demostore</p></Link>
        <button onClick={() => setShowBag(!showBag)} > <ShoppingCartIcon className={styles.cart}/></button>
        {showBag && <div className={styles.bagOverview}><BagOverview /></div>}
      </div>
    </>
  );
};
export default Header;