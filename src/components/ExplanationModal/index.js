import React, { useState, useEffect, useContext } from "react";
import styles from "./ExplanationModal.module.sass";
import Modal from '@mui/material/Modal';
import cn from "classnames";
import { useNavigate } from "react-router";
import { store } from "../../store";
import Icon from "../Icon";

const ExplanationModal = ({ show, setShow }) => {
    let navigate = useNavigate();

    const [open, setOpen] = useState(show);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                open={show}
                onClose={handleClose}>
                <div className={styles.modal}>
                    <div className={styles.modal_header}>
                        <div className={styles.arrowLeft}>
                        </div>
                        <div className={styles.headerTitle}>
                            <img src="/images/icons/logo-DLL-plus.svg" alt="DLL+ Logo" />
                        </div>
                        <button onClick={handleClose}><Icon name="close" size="24" className={styles.close} /></button>
                    </div>
                    <div className={styles.modalContent}>
                        <div className={styles.page_title}>
                            Get direct access to the finance you need
                        </div>
                        <div>
                            <ul className={styles.list}>
                                <li>Lorem ipsum dolor sit.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Consectetur adipiscing elit.</li>
                            </ul>
                        </div>
                        <div className={styles.disclaimer}>
                            By pressing Continue you consent to DLL sharing billing information with this merchant
                        </div>
                        <div className={styles.actions}>
                            <button onClick={handleClose} className={cn("button", styles.continueButton)}>Continue</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ExplanationModal;