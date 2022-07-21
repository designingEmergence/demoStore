import React, {useState} from "react";
import styles from "./Link.module.sass";
import { Link as InternalLink } from "react-router-dom";

const Link = (props) => {
    const className = props.variant === "clear" ? styles.clear : "";
    const color = props.color === "secondary" ? "black" : "white"
  return (
      <InternalLink className={className} {...props} style={{color: color}}>{props.children}</InternalLink>
  );
};

export default Link;