import React, {useState} from "react";
import styles from "./ProductGrid.module.sass";
import ProductCard from "../ProductCard";
import productCatalog  from "../../data/catalog";
import cn from "classnames";


const ProductGrid = () => {
  
  return (
    <>
      <div className={styles.productGridContainer}>
        <p className={styles.title}>Mini Excavators</p>
        <div className={styles.grid}>
          <ProductCard product={productCatalog[0]} />
        </div>
        <div className={cn("button-stroke", styles.showMoreButton)} >
              Show More
        </div>
      </div>
    </>
  );
};

export default ProductGrid;