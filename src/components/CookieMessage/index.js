import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./CookieMessage.module.sass";
import CloseIcon from "@mui/icons-material/Close";
import data from "./data";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomSwitch from "../CustomSwitch";

const CookieMessage = () => {
  const [showCookieMessage, setCookieMessage] = useState(true);
  const [show, showModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cookie-privacy")) {
      setCookieMessage(false);
    }
  }, []);

  function setLocalStorage() {
    setCookieMessage(false);
    localStorage.setItem("cookie-privacy", true);
  }

  return showCookieMessage ? (
    <>
      <div className={styles.cookieMessage}>
        <CloseIcon
          className={styles.closeCookieMessage}
          onClick={() => setLocalStorage()}
        />
        <h3>Cookies & privacy</h3>
        <p className={styles.cookieBodyText}>
          We use cookies to make the website work, to personalise and analyse
          your browsing. We also share data with our advertising partners.{" "}
          <a href="">Learn more</a>
        </p>
        <div className={styles.actions}>
          <div>
            <button
              className={cn("button", styles.settings)}
              onClick={() => showModal(true)}
            >
              Change settings
            </button>
          </div>
          <button
            className={cn("button-secondary", styles.action)}
            onClick={() => setLocalStorage()}
          >
            Deny All
          </button>
          <button
            className={cn("button-secondary", styles.action)}
            onClick={() => setLocalStorage()}
          >
            Allow All
          </button>
        </div>
      </div>
      <CookieModal
        show={show}
        showModal={showModal}
        setCookieMessage={setCookieMessage}
        setLocalStorage={setLocalStorage}
      />
    </>
  ) : (
    ""
  );
};

const CookieModal = ({ show, showModal, setLocalStorage }) => {
  return (
    <Modal open={show} onClose={showModal}>
      <div className={styles.modal}>
        <div className={styles.modal_body}>
          <h1 className={styles.title}>{data.title}</h1>
          <p>{data.description}</p>
          <h1 className={styles.preferencesTitle}>{data.preferencesTitle}</h1>
          {data.preferences.map((preference, index) => {
            return (
              <Accordion
                disableGutters={true}
                style={{ boxShadow: "none" }}
                key={index}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3 className={styles.preferenceTitle}>{preference.name}</h3>
                  <div className={styles.preferenceControl}>
                    {preference.canToggle ? <CustomSwitch /> : "Always Active"}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <p>{preference.description}</p>
                </AccordionDetails>
              </Accordion>
            );
          })}
          <button
            className={cn("button", styles.fullWidthButton)}
            onClick={() => {
              showModal(false);
              setLocalStorage();
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CookieMessage;
