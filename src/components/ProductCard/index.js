import React, {useState} from "react";
import styles from "./ProductCard.module.sass";
import cn from "classnames";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function ProductStock(props) {
  const isAvailable = props.isAvailable
  console.log(props)

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
            <h6 className={styles.productPrice}>{product.price}</h6>
            <div className={cn("button", styles.button)} >
                Buy Now
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;