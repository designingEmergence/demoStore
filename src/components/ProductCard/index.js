import React, {useState} from "react";
import styles from "./ProductCard.module.sass";
import cn from "classnames";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router";
import NumberFormat from 'react-number-format';


function ProductStock(props) {
  const isAvailable = props.isAvailable

  if (isAvailable){
    return ([
      <CheckIcon className={styles.availabilityIcon}/>,
      <p className={styles.productAvailability}>Available</p>
    ])
  } else {
    return ([
      <CloseIcon className={styles.availabilityIcon}/>,
      <p className={styles.productAvailability}>Out Of Stock</p>
    ])
  }
}

const ProductCard = ({product}) => {
  let navigate = useNavigate();
  return (
    <>
      <div className={styles.productCard}>
        <img src={product.image} alt={product.name}/>
        <div className={styles.productCard__info}>
          <p className={styles.productName}>{product.name}</p>
          <div className={styles.productAvailabilityContainer}>
            <ProductStock isAvailable={product.available}/>
          </div>
          <hr className={styles.dividerLine}/>
          <div className={styles.productCard__lower}>
            <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.productPrice}>{value}</p>}/>
            <button onClick={()=> navigate('/product')} className={cn("button", styles.button)} >
                Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;