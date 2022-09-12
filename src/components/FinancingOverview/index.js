import React, {useState, useEffect, useContext} from "react";
import styles from "./FinancingOverview.module.sass";
import NumberFormat from "react-number-format";
import cn from "classnames";
import { store } from "../../store";
import { Radio } from "@mui/material";


const mockExtrasStore = [
  {
    title: "Property casualty insurance",
    value: 80,
    type: "currency"
  },
]

function mapStateToFinanceItems(config, interestRate) {
  let items = [
    {
      title: "Payment Terms",
      value: config.paymentTerms
    },
    {
      title: "Duration",
      value: config.duration,
      suffix: "months"
    },
    {
      title: "Down Payment",
      value: config.downPayment,
      type: "currency"
    },
    {
      title: "Financing Amount",
      value: config.financingAmount,
      type: "currency",
      highlight: true
    },
    {
      title: "Cost per term",
      value: config.costPerTerm,
      type: "currency"
    },
    {
      title: "Payback per term",
      value: config.paybackPerTerm,
      type: "currency"
    },
    {
      title: "Interest per term " + '(' + (interestRate *100) + '%)',
      value: config.interestPerTerm,
      type: "currency"
    },
  ]
  return items
}

function Financeitems({values}) { 
  let items = values.map((item, index) => {
    return (
      <div className={cn(styles.item, (item.highlight && styles.highlight))} key={index}>
        <div className={cn(styles.item_title,(item.highlight && styles.item_black))}>{item.title}</div>
        <div className={styles.item_value}>
          {item.type === "currency" ? <NumberFormat value={item.value} decimalScale={0} displayType={'text'} thousandSeparator={true} prefix={'$'} /> :
          <p>{item.value + (item.suffix ? ' ' + item.suffix: '')}</p>}
        </div>
      </div>
    );
  })
  return items
}

const FinancingOverview = ({paymentMethod, paymentMethodChange}) => {
  const { state } = useContext(store);
  const financeListItems = mapStateToFinanceItems(state.financingConfig, state.interestRate);

  console.log('state', state);

  return (
    <>
      <div className={styles.financingOverviewContainer}>
        {/* <p className={styles.financingOverviewTitle}>Financing</p> */}
        <div className={styles.financingOverviewCard}>
          <div className={styles.financingOverviewCard_header}>
            <p className={styles.financingOverviewCard_title}>
              <Radio 
                checked={paymentMethod==="financing"} 
                onChange={paymentMethodChange} 
                value="financing"
                name="radio-buttons" 
                sx={{
                  color: '#000000',
                  '&.Mui-checked': {
                      color: '#000000',
                  },
                }} /> 
              Finance Powered by Konica Minolta Premier Financing</p>
            <img className={styles.financingOverviewCard_icon} src="/images/icons/dll-chip-blue.svg" alt=""/>
          </div>
          {paymentMethod === 'financing' ? 
            <>
            <hr className={styles.financingOverviewCard_divider}/>
            <div className={styles.financingOverviewCard_items}>
              <Financeitems values={financeListItems} />
            </div>
            <p className={styles.financingOverviewCard_title}>Extras</p>
            <hr className={styles.financingOverviewCard_divider}/>
            <div className={styles.financingOverviewCard_items}>
              <Financeitems values={mockExtrasStore} />
            </div>
          </>: ''}
        </div>
      </div>
    </>
  );
};

export default FinancingOverview;