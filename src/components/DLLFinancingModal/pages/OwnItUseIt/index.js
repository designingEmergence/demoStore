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
    text: "Own the equipment from day 1"
  },
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "Add maintenance and insurance to your finance contract"
  },
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "Potential to write off depreciation and interest expense"
  },
  // {
  //   icon: <CheckIcon fontSize="16px" />,
  //   text: "Avoid a large upfront cash outlay"
  // },
  // {
  //   icon: <CheckIcon fontSize="16px" />,
  //   text: "Aids in predicting cash flow"
  // },
]

const useItProperties = [
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "Fixed monthly fee, including maintenance & insurance"
  },
  {
    icon: <CheckIcon fontSize="16px" />,
    text: "At end of the term extend the contract, buy the equipment or return it"
  },
  // {
  //   icon: <CheckIcon fontSize="16px" />,
  //   text: "The equipment will be given a second life upon return"
  // },
  // {
  //   icon: <CheckIcon fontSize="16px" />,
  //   text: "Lease payments are tax deductible"
  // },
  // {
  //   icon: <CheckIcon fontSize="16px" />,
  //   text: "Option to upgrade to new technology at the end of the term"
  // },
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
          <button className={cn("button", "getStarted")} onClick={() => selectFinancingType(props.variableValue)}>
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
          price={cartTotal / 60}
          priceSubtitle="Per month, based on 48 months"
          properties={ownItProperties}
          variableValue="Own"
          mostPopular />
        <FinancingTypeContainer
          title="Use It"
          subtitle="I want to use the product for a selected period of time"
          price={cartTotal / 50}
          priceSubtitle="Per month, based on 48 months, incl. service"
          properties={useItProperties}
          variableValue="Use"
          secondary />
      </div>

    </div>
  );
}

export default OwnItUseIt;