import React, { useEffect, useState } from "react";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import styles from './ExternalDLLCheck.module.sass';
import VerifyCard from './VerifyCard';
import { useLocation } from "react-router-dom";


const ExternalDLLCheck = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <>
      <div className={styles.externalDLLCheck}>
        <VerifyCard />
      </div>
    </>
  );
};

export default ExternalDLLCheck;