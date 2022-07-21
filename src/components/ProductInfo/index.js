import React, {useState} from "react";
import styles from "./ProductInfo.module.sass";
import ProductGallery from "../ProductGallery";
import AddToCart from "../AddToCart";


const ProductInfo = ({product}) => {
  return (
    <>
      {/* <p>ProductInfo</p> */}
      <div className={styles.productInfoContainer}>
        <div className={styles.column1}>
          <p className={styles.productName}>{product.name}</p>
          <div className={styles.productRating}>
            <svg className={styles.starIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1128 1.28584L13.9159 4.83396L17.9638 5.40522C19.8601 5.67275 20.7269 8.01285 19.2651 9.39572L16.3576 12.1438L17.0419 16.016C17.3923 17.9996 15.287 19.3318 13.6291 18.4871L9.99981 16.6358L6.37157 18.4865C4.71128 19.334 2.60769 17.9973 2.95771 16.016L3.64202 12.1438L0.734896 9.3961C-0.727985 8.01223 0.141887 5.67263 2.03558 5.40525L6.08384 4.83394L7.88786 1.28584C8.75914 -0.428539 11.2417 -0.428688 12.1128 1.28584Z" fill="#FFD166"/>
            </svg>
            <p className={styles.productRatingText}>{product.rating}</p>
            <p className={styles.productRatingReviews}>({product.reviews} reviews)</p>
          </div>
          <ProductGallery className={styles.productGallery} productImages={product.images} />
        </div>
        <div className={styles.column2}>
          <AddToCart item={product} price={product.price} />
          <p className={styles.overview}>Overview</p>
          <hr className={styles.dividerLine} />
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;