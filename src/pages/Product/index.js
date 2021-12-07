import React from 'react';
import styles from './Product.module.sass';
import ProductInfo from '../../components/ProductInfo';
import productCatalog  from "../../data/catalog";


const Product = () => {
  return (
    <>
      {/* <p>Product</p> */}
      <ProductInfo product={productCatalog[0]}/>
    </>
  );
};

export default Product;