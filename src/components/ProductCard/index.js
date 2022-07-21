import React, {useState} from "react";
import styles from "./ProductCard.module.sass";
import cn from "classnames";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
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
  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.imageContainer}>
          <img className={styles.productImage} src={product.image} alt={product.name}/>
        </div>
        <div className={styles.productCard__info}>
          <p className={styles.productName}>{product.name}</p>
          <div className={styles.productAvailabilityContainer}>
            <ProductStock isAvailable={product.available}/>
          </div>
          <hr className={styles.dividerLine}/>
          <div className={styles.productCard__lower}>
            <div className={styles.productPriceContainer}>
              <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className={styles.productPrice}>{value}</p>}/>
              <NumberFormat value={product.price/60} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} suffix={' per month'} renderText={value => <p className={cn(styles.productPrice, styles.lightText)}>{value}</p>}/>
            </div>
            {/* <Link to={{
              pathname: `/product`,
              search: `?id=${product.id}`
             }} > */}
              <button className={cn("button-primary", styles.buyNowButton)} >
                Buy Now
              </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;