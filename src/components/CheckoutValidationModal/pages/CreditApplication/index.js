import React, { useState, useContext } from "react";
import styles from "./CreditApplication.module.sass";
import cn from "classnames";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Checkbox } from '@mui/material';
import { store } from "../../../../store";
import copy from "../../../../data/copy";
import TextInput from "../../../../components/TextInput";


const CreditApplicationProcessing = (props) => {
    const [verified, setVerified] = useState(false);

    setTimeout(() => {
        setVerified(true);
    }, 3000);

    return (
        <>
            {!verified && <p className={styles.page_subtitle}>We are now conducting your credit application, please bear with us for <span>2 minutes.</span></p>}
            {verified && <p className={styles.page_subtitle}>Your credit application has been approved. Please press continue to preceed to sign the finance agremeent.</p>}
            <div className={styles.centeredContent}>
                {!verified && <img src="/images_apple/checkout/loading.svg" alt="Credit application processing" />}
                {verified && <img src="/images_apple/checkout/verified.svg" alt="Credit application verified" />}
            </div>
            <div className={styles.actionsContainer}>
                {verified &&
                    <button onClick={() => {
                        props.nextPage()
                    }} className={cn("button", styles.continueButton)}>Proceed</button>
                }
            </div>
        </>
    )
}


const CreditApplicationForm = (props) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.page_subtitle}>Thank you for choosing  DLL+ Financing. Please provide the following details to complete the credit application.</p>
            <FormGroup className={styles.checkboxGroup}>
                <Grid container>
                    <Grid item sm={12}>
                        <TextInput label="Company legal name" placeholder="John Doe" type="text" />
                    </Grid>
                    <Grid item sm={12}><TextInput label="Address" placeholder="Street" type="text" /></Grid>
                    <Grid item sm={12}><TextInput label="" placeholder="City" type="text" /></Grid>
                    <Grid container item sm={12} spacing={"14px"}>
                        <Grid item sm={8}><TextInput label="" placeholder="State/Region" type="text" /></Grid>
                        <Grid item sm={2}><TextInput label="" placeholder="Zip Code" type="text" /></Grid>
                    </Grid>
                    <Grid container item sm={12} spacing={"14px"}>
                        <Grid item sm={6}><TextInput label="Phone" placeholder="+04 895 643 99" type="text" /></Grid>
                        <Grid item sm={6}><TextInput label="Business type" placeholder="" type="text" /></Grid>
                    </Grid>
                    <Grid container item sm={12}>
                        <Grid item sm={6}><TextInput label="Tax ID" placeholder="" type="text" /></Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <Checkbox sx={{
                            color: '#000000',
                            '&.Mui-checked': {
                                color: '#000000',
                            },
                        }} />
                        I hereby provide consent to conduct a credit check on Company X
                    </Grid>
                </Grid>
            </FormGroup>
            <button onClick={() => {
                props.nextPage()
            }} className={cn("button", styles.continueButton)}>Run credit check</button>
        </div>
    )
}



const CreditApplication = ({ setPage, nextPage }) => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const [subpage, setSubpage] = useState(0);

    const [insurance, setInsurance] = useState(false);
    const [maintenance, setMaintenance] = useState(false);
    const [iot, setIot] = useState(false);

    return (
        <div className={styles.page}>
            <div className={styles.addOptionsHeader}>
                <p className={styles.page_title}>Credit application</p>
            </div>
            <div>
                {subpage == 0 && <CreditApplicationForm nextPage={() => setSubpage(1)} />}
                {subpage == 1 && <CreditApplicationProcessing nextPage={() => nextPage()} />}
            </div>

        </div>
    )
}

export default CreditApplication;