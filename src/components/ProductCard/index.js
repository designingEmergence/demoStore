import React, {useState} from "react";
import styles from "./ProductCard.module.sass";
import cn from "classnames";

const ProductCard = ({product}) => {
  return (
    <>
      <div className={styles.productCard}>
        <img src={product.image} alt={product.name}/>
        <h4 className={styles.productName}>{product.name}</h4>
        <h6 className={styles.productPrice}>{product.price}</h6>
        <div className={cn("button", styles.button)} >
            Buy Now
        </div>
      </div>
    </>
  );
};

export default ProductCard;