import React, {useState} from "react";
import styles from "./ProductGrid.module.sass";
import ProductCard from "../ProductCard";
import productCatalog  from "../../data/catalog";
import { Link } from "react-router-dom";
import cn from "classnames";
import copy from "../../data/copy";


function MultipleProducts(props) {
  const products = props.products;
  const visibleItems = props.visibleItems
  return products.map((product, index) => {
    return (
      <Link to={{
        pathname: `/product`,
        search: `?id=${product.id}`
        }}>
        <ProductCard
          product={product}
          className={styles.productCard}
        />
      </Link>
    );
  }).slice(0, visibleItems);
}

const ProductGrid = () => {

  let [visibleItems, setVisibleItems] = useState(6);
  let allProductsVisible = (visibleItems >= productCatalog.length);
  
  return (
    <>
      <div className={styles.productGridContainer}>
        <p className={styles.title}>{copy.productGridName}</p>
        <div className={styles.grid}>
          <MultipleProducts products={productCatalog} visibleItems={visibleItems} />
        </div>
        {!allProductsVisible && <button onClick={()=> setVisibleItems(visibleItems += 6)} className={cn("button-stroke", styles.showMoreButton)} >
              Show More
        </button>}
      </div>
    </>
  );
};

export default ProductGrid;