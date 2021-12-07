import React, {useState} from "react";
import styles from "./ProductInfo.module.sass";
import ProductGallery from "../ProductGallery";
import AddToCart from "../AddToCart";
import StarIcon from '@mui/icons-material/Star';

const ProductInfo = ({product}) => {
  return (
    <>
      {/* <p>ProductInfo</p> */}
      <div className={styles.productInfoContainer}>
        <div className={styles.column1}>
          <p className={styles.productName}>{product.name}</p>
          <div className={styles.productRating}>
            <StarIcon className={styles.starIcon} />
            <p className={styles.productRatingText}>{product.rating}</p>
            <p className={styles.productRatingReviews}>({product.reviews} reviews)</p>
          </div>
          <ProductGallery images={product.images} />
        </div>
        <div className={styles.column2}>
          <AddToCart price={product.price} />
          <p className={styles.overview}>Overview</p>
          <hr className={styles.hr} />
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;