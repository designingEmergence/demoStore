import React, { useReducer, useState } from "react";
import styles from "./InfoButtonTooltip.module.sass";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import cn from "classnames";

const InfoButtonTooltip = ({ text, onClick }) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <div className={styles.tooltipContainer}>
        <div
          className={cn(styles.tooltipBox, { [styles.tooltipBoxVisible]: show})}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {text}
        </div>
        <div
        //   className={show ? styles.tooltipWhiteSpaceVisible : styles.tooltipWhiteSpace}
          className={cn(styles.tooltipWhiteSpace, { [styles.tooltipWhiteSpaceVisible]: show })}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        ></div>
        <InfoIcon
          onClick={onClick}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        />
      </div>
    </>
  );
};

export default InfoButtonTooltip;
