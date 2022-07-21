import React, { useContext } from "react";
import styles from "./OwnItUseIt.module.sass";
import cn from "classnames";
import { useCart } from "react-use-cart"
import { store } from "../../../../store";
import NumberFormat from "react-number-format";
import copy from "../../../../data/copy";

import CheckIcon from '@mui/icons-material/Check';

import splitbee from '@splitbee/web';
import { Stack } from "@mui/material";


const ownItProperties = [
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "Own the product from day 1"
  },
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "Finance the full amount or just part of it"
  },
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "Your investment is tax deductible"
  },
]

const useItProperties = [
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "Pay monthly to use the product"
  },
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "Upgrade to the latest product after 2 years"
  },
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "Maintenance included"
  },
]

const OwnItUseIt = ({ selectionFunction }) => {
  const { cartTotal } = useCart();
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const selectNextPage = selectionFunction;

  function selectFinancingType(type) {
    dispatch({
      type: "SET_FINANCING_TYPE",
      payload: type,
    });
    splitbee.track("Financing Type: " + type)
    selectNextPage(type);
  }

  function Properties({ properties }) {
    return properties.map((property, index) => {
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
        <div className={styles.financingTypeContainer_tab_wrapper}>
          {props.mostPopular &&
            <div>Most popular</div>
          }
        </div>
        <div className={`${styles.financingTypeContainer_button} ${props.secondary ? styles.secondary : ''}`}>
          <Stack direction="row" justifyContent="center" alignItems="center" className={styles.titleWrapper}>
            <img className={styles.financingTypeContainer_title_img} src="/images/icons/dll-chip.svg" alt="DLL+ Logo" />
            <p className={styles.financingTypeContainer_title}>
              {props.title}
            </p>
          </Stack>
          <p className={styles.financingTypeContainer_subtitle}>{props.subtitle}</p>
          <Stack direction="row" spacing={2} alignItems="flex-start" className={styles.priceContainer}>
            <NumberFormat value={props.price} displayType={'text'} decimalScale={0} thousandSeparator={true} prefix={'$'}
              renderText={value => <p className={styles.financingTypeContainer_price}>{value}</p>} />
            <p className={styles.financingTypeContainer_priceSubtitle}>{props.priceSubtitle}</p>
          </Stack>
          <div className={styles.financingTypeContainerProperties}>
            <Properties properties={props.properties} />
          </div>
          <button className={cn("button")} onClick={() => selectFinancingType(props.variableValue)}>
            Get started
          </button>
        </div>
      </div >
    );
  }

  return (
    <div className={styles.page}>
      <p className={styles.page_title}>Own it or Use it</p>
      <p className={styles.page_subtitle}>Please select whether you want to buy the {copy.assetDescriptor} and own it right away, or lease it and use it for a short period of time to configure the financing options.</p>

      <div className={styles.useItContainer}>
        <FinancingTypeContainer
          title="Own It"
          subtitle="I want to buy the product and own it from day 1"
          price={cartTotal / 50}
          priceSubtitle="Per month, based on 48 months"
          properties={ownItProperties}
          variableValue="Own"
          mostPopular />
        <FinancingTypeContainer
          title="Use It"
          subtitle="I want to use the product for a selected period of time"
          price={cartTotal / 60}
          priceSubtitle="Per month, based on 48 months, incl. service contract"
          properties={useItProperties}
          variableValue="Use"
          secondary />
      </div>

    </div>
  );
}

export default OwnItUseIt;