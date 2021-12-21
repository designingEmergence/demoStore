import React, {useState} from "react";
import styles from "./FinancingOverview.module.sass";
import NumberFormat from "react-number-format";
import classNames from "classnames";

const mockFinanceStore = [
  {
    title: "Payment Terms",
    value: "Monthly"
  },
  {
    title: "Duration",
    value: 48,
    suffix: "months"
  },
  {
    title: "Down Payment",
    value: 8539,
    type: "currency"
  },
]

const mockExtrasStore = [
  {
    title: "Property casualty insurance",
    value: 80,
    type: "currency"
  },
]

function Financeitems({values}) { 
  let items = values.map((item, index) => {
    return (
      <div className={styles.item} key={index}>
        <div className={styles.item_title}>{item.title}</div>
        <div className={styles.item_value}>
          {item.type === "currency" ? <NumberFormat value={item.value} displayType={'text'} thousandSeparator={true} prefix={'$'} /> :
          <p>{item.value + (item.suffix ? ' ' + item.suffix: '')}</p>}
        </div>
      </div>
    );
  })
  return items
}

const FinancingOverview = () => {
  return (
    <>
      <div className={styles.financingOverviewContainer}>
        <p className={styles.financingOverviewTitle}>Financing</p>
        <div className={styles.financingOverviewCard}>
          <div className={styles.financingOverviewCard_header}>
            <p className={styles.financingOverviewCard_title}> Finance Powered by DLL</p>
            <img className={styles.financingOverviewCard_icon} src="/images/icons/dll.svg" alt=""/>
          </div>
          <hr className={styles.financingOverviewCard_divider}/>
          <div className={styles.financingOverviewCard_items}>
            <Financeitems values={mockFinanceStore} />
          </div>
          <p className={styles.financingOverviewCard_title}>Extras</p>
          <hr className={styles.financingOverviewCard_divider}/>
          <div className={styles.financingOverviewCard_items}>
            <Financeitems values={mockExtrasStore} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancingOverview;