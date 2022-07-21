import React, { useState, useEffect, useContext } from "react";
import styles from "./CheckoutValidationModal.module.sass";
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router";
import { store } from "../../store";
import Stepper from '../Stepper';
import CreditApplication from "./pages/CreditApplication";
import SignatoryAuthority from "./pages/SignatoryAuthority";
import VerificationProcess from "./pages/VerificationProcess";
import Icon from "../Icon";
import VerifyCard from "../../pages/ExternalDLLCheck/VerifyCard";

const CheckoutValidationModal = ({ show, setShow }) => {
    let navigate = useNavigate();

    const [open, setOpen] = useState(show);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    const [financingType, setFinancingType] = useState(null);

    const [page, setPage] = useState(0);

    function handleFinancingType(type) {
        setFinancingType(type);
        console.log('financingType: ', financingType)
        if (type === 'Own') setPage(1);
        else setPage(2);
    }

    function handlePreviousPage() {
        if (page <= 1) setPage(0);
        else setPage(page - 1);
    }

    function handleNextPage() {
        if (page >= pages.length-1) {
            navigate('/thankyou');
        } 
        else setPage(page + 1);
    }

    function getSteps() {
        const steps = pages.map((page, index) => {
            return page.name;
        })

        return steps;
    }

    const pages = [
        {
            name: 'Credit application',
            component: <CreditApplication setPage={setPage} nextPage={handleNextPage}/>
        },
        {
            name: 'Signatory Authority',
            component: <SignatoryAuthority setPage={setPage} nextPage={handleNextPage}/>
        },
        {
            name: 'Signatory Authority',
            component: <VerifyCard setPage={setPage} nextPage={handleNextPage}/>
        },
        {
            name: 'Verification process',
            component: <VerificationProcess setPage={setPage} nextPage={handleNextPage}/>
        }
    ]


    return (
        <>
            <Modal
                open={show}
                onClose={handleClose}>
                <div className={styles.modal}>
                    <div className={styles.modal_header}>
                        <div className={styles.arrowLeft}>
                            {page != 0 && <button onClick={handlePreviousPage}><Icon name="arrow-prev" size="24" /></button>}
                        </div>
                        <div className={styles.headerTitle}>
                            <img src="/images/icons/logo-DLL-plus.svg" alt="DLL+ Logo" />
                        </div>
                        <button onClick={handleClose}><Icon name="close" size="24" className={styles.close} /></button>
                    </div>
                    <div className={styles.modalContent}>
                        <div>
                            <Stepper steps={getSteps()} activeStep={page} />
                        </div>
                        <div className={styles.modal_body}>
                            {pages[page].component}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CheckoutValidationModal;