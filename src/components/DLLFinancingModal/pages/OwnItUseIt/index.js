import React, {useContext} from "react";
import styles from "./OwnItUseIt.module.sass";
import { useCart } from "react-use-cart"
import { store } from "../../../../store";
import NumberFormat from "react-number-format";
import copy from "../../../../data/copy";

const OwnItUseIt = ({selectionFunction}) => {
  const { cartTotal } = useCart();
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const selectNextPage= selectionFunction;

  function selectFinancingType(type) {
    dispatch({
      type: "SET_FINANCING_TYPE",
      payload: type,
    });
    selectNextPage(type);
  } 

  function FinancingTypeContainer(props) {
    return (
      <div className={styles.financingTypeContainer}>
        <p className={styles.financingTypeContainer_title}>{props.title}</p>
        <button onClick={()=>selectFinancingType(props.variableValue)} className={styles.financingTypeContainer_button}>
          <p className={styles.financingTypeContainer_button_title}>{props.buttonTitle}</p>
          <NumberFormat value={props.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix={'$'} 
           renderText={value => <span className={styles.financingTypeContainer_button_price}>{value}</span>} />
          <span className={styles.financingTypeContainer_button_title}> per month</span>
          <p className={styles.financingTypeContainer_button_subtitle}>{props.buttonSubtitle}</p>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <p className={styles.page_title}>Own it or Use it?</p>
      <p className={styles.page_subtitle}>Please select whether you want to own the {copy.assetDescriptor} or use it for a short period of time to configure the financing options.</p>

      <div className={styles.useItContainer}>
        <FinancingTypeContainer
          title="I want to own it"
          buttonTitle="Pay in installaments from"
          price={cartTotal/50}
          buttonSubtitle="based on 48 months" 
          variableValue="Own"/>
        <FinancingTypeContainer
          title="I want to use it"
          buttonTitle="Use these products from"
          price={cartTotal/60}
          buttonSubtitle="based on 48 months, incl. service contract" 
          variableValue="Use" />
      </div>

    </div>
  );
}

export default OwnItUseIt;