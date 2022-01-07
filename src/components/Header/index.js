import React, {useState, useRef, useEffect} from "react";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.sass";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BagOverview from '../BagOverview';
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";


const Header = ({}) => {
  const ref = useRef();
  let [showBag, setShowBag] = useState(false);

  useOnClickOutside(ref, () => setShowBag(false));
  const { pathname } = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    setShowBag(false);
  }, [pathname])

  return (
    
    <>
      <div className={styles.header}>
        <Link to="/"><p className={styles.logoBlack}>Demostore</p></Link>
        <button onClick={() => {
          setShowBag(!showBag);
        }
         } > 
          <Badge  badgeContent={totalItems} color="primary">
            <ShoppingCartIcon className={styles.cart}/>
          </Badge>
        </button>
        {showBag && <div className={styles.bagOverview} ><BagOverview showPaymentOptions={true}/></div>}
      </div>
    </>
  );
};

function useOnClickOutside(ref, handler) {
  React.useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      } 
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler]
  );
}
       

export default Header;