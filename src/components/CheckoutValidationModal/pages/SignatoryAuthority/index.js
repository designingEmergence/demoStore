import React, { useState, useContext } from "react";
import commonStyles from "../common/styles.module.sass";
import styles from "./SignatoryAuthority.module.sass";
import cn from "classnames";
import FormGroup from '@mui/material/FormGroup';
import { Grid, Stack, Checkbox } from '@mui/material';
import { store } from "../../../../store";
import copy from "../../../../data/copy";
import TextInput from "../../../../components/TextInput";


const CheckboxField = (props) => {
    return (
        <Stack direction="row" spacing="12px" alignItems="flex-start">
            <Checkbox classes={{ root: commonStyles.checkbox, checked: commonStyles.checkboxChecked }} {...props}/>
            <div>{props.text}</div>
        </Stack>
    )
}


const SignatoryAuthorityForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [consent, setConsent] = useState(false);
    const [hasSignatory, setHasSignatory] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'jobTitle':
                setJobTitle(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            default:
                break;
        }
    }


    return (
        <>
            <p className={commonStyles.page_subtitle}>Please confirm that you have signatory authority within your organization.</p>
            <FormGroup className={commonStyles.checkboxGroup}>
                <Grid container>
                    <Grid container item sm={12} className={styles.checkboxGroup} spacing="16px">
                        <Grid item>
                            <CheckboxField 
                                text="I hereby provide consent to conduct a credit check on Company X" 
                                value={consent} 
                                onChange={(e) => setConsent(e.target.checked)} />
                        </Grid>
                        <Grid item>
                            <CheckboxField 
                                text="I do not have signatory authority, please share contact details of signatory within the organization" 
                                value={hasSignatory} 
                                onChange={(e) => setHasSignatory(e.target.checked)} />
                        </Grid>
                    </Grid>
                    <Grid container item sm={12} spacing={"14px"}>
                        <Grid item sm={6}>
                            <TextInput 
                                name="firstName"
                                label="Signatory first name" 
                                placeholder="" 
                                type="text" 
                                value={firstName} 
                                onChange={handleChange} 
                                required />
                        </Grid>
                        <Grid item sm={6}>
                            <TextInput 
                                name="lastName"
                                label="Signatory last name" 
                                placeholder="" 
                                type="text" 
                                value={lastName}
                                onChange={handleChange} 
                                required />
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <TextInput 
                            name="jobTitle"
                            label="Signatory job title" 
                            placeholder="" 
                            type="text" 
                            value={jobTitle} 
                            onChange={handleChange} 
                            required />
                    </Grid>
                    <Grid container item sm={12} spacing={"14px"}>
                        <Grid item sm={6}>
                            <TextInput 
                                name="email"
                                label="Signatory contact email" 
                                placeholder="" 
                                type="text" 
                                value={email} 
                                onChange={handleChange} 
                                required />
                        </Grid>
                        <Grid item sm={6}>
                            <TextInput 
                                name="phoneNumber"
                                label="Signatory phone number" 
                                placeholder="" 
                                type="text" 
                                value={phoneNumber} 
                                onChange={handleChange} 
                                required />
                        </Grid>
                    </Grid>
                </Grid>
            </FormGroup>
            <button onClick={() => {
                props.submitForm({
                    firstName,
                    lastName,
                    jobTitle,
                    email,
                    phoneNumber,
                    consent,
                    hasSignatory
                })
            }} className={cn("button", commonStyles.continueButton)}>Continue</button>
        </>
    )
}



const SignatoryAuthority = ({ setPage, nextPage }) => {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    function dispatchOptions(data) {
        dispatch({ type: 'SET_SIGNATORY_AUTHORITY', payload: data});
    }

    const handleSubmit = (data) => {
        dispatchOptions(data);
        nextPage();
    }

    return (
        <div className={commonStyles.page}>
            <div className={commonStyles.addOptionsHeader}>
                <p className={commonStyles.page_title}>SignatoryAuthority</p>
            </div>
            <div>
                <SignatoryAuthorityForm submitForm={handleSubmit} />
            </div>

        </div>
    )
}

export default SignatoryAuthority;