import React from "react";
import cn from "classnames";
import styles from "./Counter.module.sass";
import Icon from "../Icon";

const Counter = ({ className,id, value, setValue, iconMinus, iconPlus }) => {

  let [count, setCount] = React.useState(value);

  return (
    <div className={cn(className, styles.counter)}>
      <button
        className={cn(styles.button, { [styles.disabled]: count === 0 })}
        onClick={() => setCount(count-1)}
      >
        <Icon name={iconMinus} size="24" />
      </button>
      <div className={styles.number}>{count}</div>
      <button className={styles.button} onClick={() => setCount(count+1)}>
        <Icon name={iconPlus} size="24" />
      </button>
    </div>
  );
};

export default Counter;
