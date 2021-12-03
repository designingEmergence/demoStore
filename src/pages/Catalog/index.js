import React from 'react';
import styles from './Catalog.module.sass';

import Banner from '../../components/Banner';
import ProductGrid from '../../components/ProductGrid';
import PaymentIcons from '../../components/PaymentIcons';

const Catalog = () => {
  return (
    <>
      {/* <p>Catalog</p> */}
      <Banner />
      <ProductGrid />
      <PaymentIcons />
    </>
  );
};

export default Catalog;