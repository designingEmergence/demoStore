import { Grid } from "@mui/material";
import React, {useState} from "react";
import styles from "./DocuSign.module.sass";
import stroke from './stroke.svg';
import cn from 'classnames';

const DocuSign = ({id, name, initials, minimal = false, font}) => {
  return (
    <>
        <Grid container>
            <Grid item xs={initials ? 8 : 12}>
                <div className={styles.docuSign}>
                    <svg className={styles.connector} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.11 160"><path className={styles.border} d="M32.11,1H24A23,23,0,0,0,1,24V136a23,23,0,0,0,23,23"/></svg>
                    <div className={styles.docuSignContent}>
                        <p className={styles.signedBy}>DocuSign by:</p>
                        <p className={cn(font, styles.name)}>{name}</p>
                        <p className={styles.id}>{id}</p>
                    </div>
                </div>
            </Grid>
            {initials ? 
                <Grid item xs={4}>
                <div className={styles.docuSign}>
                    <svg className={styles.connector} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.11 160"><path className={styles.border} d="M32.11,1H24A23,23,0,0,0,1,24V136a23,23,0,0,0,23,23"/></svg>
                    <div className={styles.docuSignContent}>
                        <p className={styles.signedBy}>DS</p>
                        <p className={cn(font, styles.name)}>{initials}</p>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </Grid> : ''}
        </Grid>
    </>
  );
};

export default DocuSign;