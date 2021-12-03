import React, {useState} from "react";
import styles from "./ProductGrid.module.sass";
import ProductCard from "../ProductCard";
import productCatalog  from "../../data/catalog";
import cn from "classnames";


const ProductGrid = () => {
  
  return (
    <>
      <p>ProductGrid</p>
      <h3 className={styles.title}>Mini Excavators</h3>
      <div className={styles.grid}>
        <ProductCard product={productCatalog[0]} />
      </div>
      <div className={cn("button", styles.button)} >
            Show More
      </div>
    </>
  );
};

export default ProductGrid;