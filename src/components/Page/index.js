import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Page.module.sass";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import Ribbon from "../Ribbon";
import Header from "../Header";
import Footer from "../Footer";

const Page = ({ 
  seperatorHeader,
  children,
  footerHide,
  wide,
  notAuthorized
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearAllBodyScrollLocks();
  }, [pathname]);

  return (
    <>
      <div className={styles.page}>
        <Ribbon 
          seperatorHeader={seperatorHeader}
          wide={wide}
          notAuthorized={notAuthorized}
          className={styles.ribbon}
        />
        <Header className={styles.header}/>
        <div className={styles.inner}>{children}</div>
        {!footerHide && <Footer />}
      </div>
    </>
    );
  };

  export default Page;