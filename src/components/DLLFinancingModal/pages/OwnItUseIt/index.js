import React, {useContext} from "react";
import styles from "./OwnItUseIt.module.sass";
import { useCart } from "react-use-cart"
import { store } from "../../../../store";
import NumberFormat from "react-number-format";
import copy from "../../../../data/copy";

import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import MoneyOffOutlinedIcon from '@mui/icons-material/MoneyOffOutlined';

import ContactlessOutlinedIcon from '@mui/icons-material/ContactlessOutlined';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

import splitbee from '@splitbee/web';


const ownItProperties = [
  {
    icon: <Inventory2OutlinedIcon fontSize="16px" />,
    text: "Own the product from day 1"
  },
  {
    icon: <PriceCheckOutlinedIcon fontSize="16px"/>,
    text: "Finance the full amount or just part of it"
  },
  {
    icon: <MoneyOffOutlinedIcon fontSize="16px"/>,
    text: "Your investment is tax deductible"
  },
]

const useItProperties = [
  {
    icon: <ContactlessOutlinedIcon fontSize="16px"/>,
    text: "Pay monthly to use the product" 
  },
  {
    icon: <UpgradeOutlinedIcon fontSize="16px"/>,
    text: "Upgrade to the latest product after 2 years"
  },
  {
    icon: <HandymanOutlinedIcon fontSize="16px"/>,
    text: "Maintenance included"
  },
]

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
    splitbee.track("Financing Type: " + type)
    selectNextPage(type);
  } 

  function Properties({properties}) {
    return properties.map( (property, index) => {
      return (
        <div key={index} className={styles.property}>
          <div className={styles.propertyIcon}>{property.icon}</div><p className={styles.propertyText}>{property.text}</p>
        </div>
      )
    })
  }

  function FinancingTypeContainer(props) {
    return (
      <div className={styles.financingTypeContainer}>
        
        <button onClick={()=>selectFinancingType(props.variableValue)} className={styles.financingTypeContainer_button}>
          <p className={styles.financingTypeContainer_title}>{props.title}</p>
          <p className={styles.financingTypeContainer_subtitle}>{props.subtitle}</p>
          <NumberFormat value={props.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix={'$'} 
           renderText={value => <p className={styles.financingTypeContainer_price}>{value}</p>} />
          <p className={styles.financingTypeContainer_priceSubtitle}>{props.priceSubtitle}</p>
          <div className={styles.financingTypeContainerProperties}>
            <Properties properties={props.properties} />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <p className={styles.page_title}>Buy it or Lease it</p>
      <p className={styles.page_subtitle}>Please select whether you want to buy the {copy.assetDescriptor} and own it right away, or lease it and use it for a short period of time to configure the financing options.</p>

      <div className={styles.useItContainer}>
        <FinancingTypeContainer
          title="Buy It"
          subtitle="I want to buy the product and own it from day 1"
          price={cartTotal/50}
          priceSubtitle="Per month, based on 48 months"
          properties={ownItProperties} 
          variableValue="Own"/>
        <FinancingTypeContainer
          title="Lease It"
          subtitle="I want to use the product for a selected period of time"
          price={cartTotal/60}
          priceSubtitle="Per month, based on 48 months, incl. service contract"
          properties={useItProperties} 
          variableValue="Use" />
      </div>

    </div>
  );
}

export default OwnItUseIt;