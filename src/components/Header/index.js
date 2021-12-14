import React, {useContext, useState, useRef} from "react";
import styles from "./Header.module.sass";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BagOverview from '../BagOverview';
import { Link } from "react-router-dom";

const Header = ({}) => {
  const ref = useRef();
  let [showBag, setShowBag] = useState(false);
  useOnClickOutside(ref, () => setShowBag(false));

  return (
    <>
      <div className={styles.header}>
        <Link to="/"><p className={styles.logoBlack}>Demostore</p></Link>
        <button onClick={() => setShowBag(!showBag)} > <ShoppingCartIcon className={styles.cart}/></button>
        {showBag && <div className={styles.bagOverview} ref={ref} ><BagOverview showPaymentOptions={true}/></div>}
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