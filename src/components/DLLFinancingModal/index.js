import React, {useState, useEffect, useContext} from "react";
import styles from "./DLLFinancingModal.module.sass";
import Modal from '@mui/material/Modal';
import { store } from "../../store";
import PaymentTerms from "./pages/PaymentTerms";
import OwnItUseIt from "./pages/OwnItUseIt";
import AddOptions from './pages/AddOptions';



function UseItPage() {
  return (
    <div className={styles.page}>
      <p className={styles.page_title}>Use it through financing</p>
      <p className={styles.page_subtitle}>Configure the options to generate the quote for using the products</p>
      <PaymentTerms />
    </div>
  );
}

function OwnItPage() {
  return (
    <div className={styles.page}>
      <p className={styles.page_title}>Own it through financing</p>
      <p className={styles.page_subtitle}>Configure the options to generate the quote for owning the products</p>
      <PaymentTerms />
    </div>
  );
}


const DLLFinancingModal = ({show, setShow}) => {
  const globalState = useContext(store);
  console.log('globalState: ', globalState)

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


  return (
    <>
      <Modal 
        open={show}
        onClose={handleClose}>
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            <img src="/images/icons/dllSymbol.svg" alt="DLL Logo" />
          </div>
          <div className={styles.modal_body}>
            {page === 0 && <OwnItUseIt selectionFunction={handleFinancingType}/>}
            {page === 1 && <AddOptions setPage={setPage} nextPage={3}/>}
            {page === 2 && <UseItPage />}
            {page === 3 && <OwnItPage />}
          </div>
        </div>
       </Modal>
    </>
  );
};

export default DLLFinancingModal;