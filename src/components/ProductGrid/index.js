import React, {useState} from "react";
import styles from "./ProductGrid.module.sass";
import ProductCard from "../ProductCard";
import productCatalog  from "../../data/catalog";
import cn from "classnames";

var itemsToShow = 6;

function incrementItemsToShow() {
  itemsToShow += 6;
  console.log(itemsToShow);
}

function MultipleProducts(props) {
  const products = props.products;
  const visibleItems = props.visibleItems
  return products.map((product, index) => {
    return (
      <ProductCard
        product={product}
        className={styles.productCard}
      />
    );
  }).slice(0, visibleItems);
}

const ProductGrid = () => {
  
  return (
    <>
      <div className={styles.productGridContainer}>
        <p className={styles.title}>Mini Excavators</p>
        <div className={styles.grid}>
          <MultipleProducts products={productCatalog} visibleItems={itemsToShow} />
        </div>
        <button onClick={incrementItemsToShow} className={cn("button-stroke", styles.showMoreButton)} >
              Show More
        </button>
      </div>
    </>
  );
};

export default ProductGrid;