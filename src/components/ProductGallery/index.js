import React, {useState} from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./ProductGallery.module.sass";
import "./ProductGallery.css";


const ProductGallery = (props) => {
  let images=  props.productImages.map(image => {
    return {
      original: image,
      thumbnail: image
    }
  })

  console.log(images)

  return (
    <>
      <ImageGallery items={images}
        showPlayButton={false}
        showFullscreenButton = {false} 
        showNav = {false}
        originalClass={styles.mainImage}/>
    </>
  );
};

export default ProductGallery;