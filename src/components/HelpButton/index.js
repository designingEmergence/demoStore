import React, {useState, useRef, useEffect} from "react";
import styles from './HelpButton.module.sass';

const HelpButton = () => {
  function checkChatWoot(){
    if(window.$chatwoot){
      window.$chatwoot.toggleBubbleVisibility('hide');
      clearInterval(window.checkChatWootInterval);
    } else {
      clearInterval(window.checkChatWootInterval);
    }
  }
  useEffect(() => {
    window.checkChatWootInterval = setInterval(()=>{
      checkChatWoot();
    },500);
  },[]);
  return (
    <>
        <button className={styles.helpButton} onClick={() => window.$chatwoot.toggle()}>
            <img src="/images/icons/help-icon.svg" alt=""/>
            <h3>Need Help?</h3>
        </button>
    </>
  );
};     

export default HelpButton;