import React, {useState, useEffect, useContext} from "react";
import styles from "./DLLFinancingModal.module.sass";
import Modal from '@mui/material/Modal';
import { store } from "../../store";
import PaymentTerms from "./pages/PaymentTerms";
import OwnItUseIt from "./pages/OwnItUseIt";
import AddOptions from './pages/AddOptions';
import Icon from "../Icon";
import cn from 'classnames';



function UseItPage() {
  return (
    <div className={styles.page}>
      <p className={styles.page_title}><span className={styles.use_it}>Use it</span> through financing</p>
      <p className={styles.page_subtitle}>Configure the options to generate the quote for using the products</p>
      <PaymentTerms />
    </div>
  );
}

function OwnItPage() {
  return (
    <div className={styles.page}>
      <p className={styles.page_title}><span className={styles.own_it}>Own it</span> through financing</p>
      <p className={styles.page_subtitle}>Configure the options to generate the quote for owning the products</p>
      <PaymentTerms />
    </div>
  );
}


const DLLFinancingModal = ({show, setShow}) => {

  const [open, setOpen] = useState(show);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [financingType, setFinancingType] = useState(null);

  const [page, setPage] = useState(0);

  function handleFinancingType(type){
    setFinancingType(type);
    console.log('financingType: ', financingType)
    if(type === 'Own') setPage(1);
    else setPage(2);
  }

  function handlePreviousPage(){
    if (page === 1) setPage(0);
    else if (page === 2) setPage(0);
    else if (page === 3) setPage(1);
  }


  return (
    <>
      <Modal 
        open={show}
        onClose={handleClose}>
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            {page != 0 && <button onClick={handlePreviousPage}><Icon name="arrow-prev" size="24" className={styles.arrowLeft} /></button>}
            <img  src="/images/icons/logo-DLL-plus.svg" alt="DLL+ Logo" />
            <button onClick={handleClose}><Icon name="close" size="24" className={styles.close} /></button>
          </div>
          <div className={styles.modal_body}>
            {page === 0 && <OwnItUseIt selectionFunction={handleFinancingType}/>}
            {page === 1 && <AddOptions setPage={setPage} nextPage={3}/>}
            {page === 2 && <UseItPage />}
            {page === 3 && <OwnItPage />}
            <div className={styles.modalSteps}>
              <div className={cn(styles.modalStep, page === 0 ? styles.modalStepActive : '')}></div>
              <div className={cn(styles.modalStep, page === 1 ? styles.modalStepActive : '')}></div>
              <div className={cn(styles.modalStep, page === 3 ? styles.modalStepActive : '')}></div>
            </div>
          </div>
        </div>
       </Modal>
    </>
  );
};

export default DLLFinancingModal;