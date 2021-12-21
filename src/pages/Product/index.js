import React from 'react';
import styles from './Product.module.sass';
import ProductInfo from '../../components/ProductInfo';
import productCatalog  from "../../data/catalog";
import { useSearchParams } from 'react-router-dom';


const Product = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const product = productCatalog.find(product => product.id === productId);

  return (
    <>
      {/* <p>Product</p> */}
      <ProductInfo product={product}/>
    </>
  );
};

export default Product;