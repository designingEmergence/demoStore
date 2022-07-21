import React, { useState, useContext, useRef } from "react";
import commonStyles from "../common/styles.module.sass";
import styles from "./VerificationProcess.module.sass";
import cn from "classnames";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Checkbox, Stack } from '@mui/material';
import { store } from "../../../../store";
import copy from "../../../../data/copy";
import TextInput from "../../../../components/TextInput";
import Link from "../../../../components/Link";
import Dropdown from "../../../../components/Dropdown";
import InfoIcon from "@mui/icons-material/InfoOutlined";

const CheckboxField = (props) => {
    return (
        <Stack direction="row" spacing="12px" alignItems="flex-start">
            <Checkbox classes={{ root: commonStyles.checkbox, checked: commonStyles.checkboxChecked }} {...props} />
            <div>{props.text}</div>
        </Stack>
    )
}


const VerificationStart = (props) => {
    return (
        <>
            <div className={commonStyles.addOptionsHeader}>
                <p className={commonStyles.page_title}>Start your verification</p>
            </div>
            <p className={commonStyles.page_subtitle}>We’ll guide you through a simple process to verify your identity.</p>
            <div className={styles.centeredContent}>
                <img src="/images_apple/checkout/verification-start.svg" alt="Verification start" />
            </div>
            <div className={commonStyles.actionsContainer}>
                <button onClick={() => {
                    props.nextPage()
                }} className={cn("button", commonStyles.continueButton)}>Start</button>
            </div>
        </>
    )
}

const PrepareForVerification = (props) => {
    const [agreement, setAgreement] = useState(false);

    return (
        <>
            <div className={commonStyles.addOptionsHeader}>
                <p className={commonStyles.page_title}>Prepare for your verification</p>
            </div>
            <p className={commonStyles.page_subtitle}>We’ll guide you through a simple process to verify your identity.</p>
            <div className={styles.listContainer}>
                <ul className={styles.list}>
                    <li><div className={styles.listCount}>1</div>Agree to the terms and conditions</li>
                    <li><div className={styles.listCount}>2</div>Passport, Driver’s license or National ID card</li>
                    <li><div className={styles.listCount}>3</div>A document showing your TAX ID number</li>
                </ul>
                <CheckboxField
                    text={<>I have read the <Link to="" color='secondary'>privacy policy</Link> and <Link to="" color="secondary">terms and conditions</Link> and agree to have my identity verified.</>}
                    value={agreement}
                    onChange={(e) => setAgreement(e.target.checked)} />
            </div>
            <div className={commonStyles.actionsContainer}>
                <button onClick={() => {
                    props.nextPage()
                }} className={cn("button", commonStyles.continueButton, !agreement ? "disabled" : "")} disabled={!agreement}>Continue</button>
            </div>
        </>
    )
}

const DocumentVerification = (props) => {
    const documentTypes = [
        'Passport (Valid)',
        'ID Card'
    ]

    const [documentType, setDocumentType] = useState(documentTypes[0]);
    const [file, setFile] = useState("");
    const uploadInputRef = useRef(null);


    const handleDocumentTypeChange = (newValue) => {
        setDocumentType(newValue);

    };

    const onChange = (e) => {
        let filename = e.target.value;
        console.log(e.target.files[0])
        if (e.target.files.length > 0) {
            filename = e.target.files[0].name;
        }
        setFile(filename);
    }

    const clearFile = () => {
        setFile("");
        uploadInputRef.current.value = "";
    }

    return (
        <>
            <div className={commonStyles.addOptionsHeader}>
                <p className={commonStyles.page_title}>{props.title}</p>
            </div>
            <div className={styles.page_subtitle}>
                {file && <p>Upload successful</p>}
                {!file &&
                    <>
                        {props.headerText}
                    </>
                }
            </div>
            <div>
                {props.hasDocumentTypeSelection &&
                    <Dropdown
                        className={styles.dropdown}
                        value={documentType}
                        options={documentTypes}
                        setValue={handleDocumentTypeChange}
                        label="Document type" />
                }
                <input
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={onChange}
                />
                {
                    file && <button onClick={clearFile} className={cn("button-quaternary", commonStyles.continueButton)}><span className={cn("icon", styles.iconRemove)}></span> Remove {file}</button>
                }
                {
                    !file && <button
                        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                        className={cn("button-quaternary", commonStyles.continueButton)}>
                        <span className={cn("icon", styles.iconUpload)}></span>
                        {props.uploadButtonText ||
                            <>Upload a picture of your {documentType}</>
                        }
                    </button>
                }
            </div>
            <div className={styles.centeredImage}>
                {!file && <img src={props.middleImage} alt={props.middleImageAlt} />}
                {file && <img src={props.middleImageDone} alt={props.middleImageAltDone} />}
            </div>
            <div className={commonStyles.actionsContainer}>
                <button onClick={() => {
                    props.nextPage()
                }} className={cn("button", commonStyles.continueButton, !file ? "disabled" : "")} disabled={!file}>Continue</button>
            </div>
        </>
    )
}




const VerificationProcess = ({ setPage, nextPage }) => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const [subpage, setSubpage] = useState(0);

    const [insurance, setInsurance] = useState(false);
    const [maintenance, setMaintenance] = useState(false);
    const [iot, setIot] = useState(false);

    return (
        <div className={commonStyles.page}>
            <div>
                {subpage == 0 && <VerificationStart nextPage={() => setSubpage(1)} />}
                {subpage == 1 && <PrepareForVerification nextPage={() => setSubpage(2)} />}
                {subpage == 2 && <DocumentVerification
                    nextPage={() => setSubpage(3)}
                    title="ID Verification"
                    hasDocumentTypeSelection={true}
                    headerText={
                        <>
                            <p>Please select the document type from the dropdown list and upload your document.</p>
                            <Stack direction="row" spacing="8px">
                                <InfoIcon />
                                <div>Use an app to protect the safety of your passport.</div>
                            </Stack>
                        </>}
                    middleImage="/images_apple/checkout/upload-id.svg"
                    middleImageDone="/images_apple/checkout/upload-id-done.svg"
                    middleImageAlt="Upload ID"
                    middleImageAltDone="Upload ID Complete"
                />}
                {subpage == 3 && <DocumentVerification
                    nextPage={() => nextPage()}
                    title="Company Verification"
                    headerText={<p>Please upload a document showing your company's TAX ID number.</p>}
                    uploadButtonText="Upload a document showing TAX ID number"
                    middleImage="/images_apple/checkout/upload-single-file.svg"
                    middleImageDone="/images_apple/checkout/upload-single-file-done.svg"
                    middleImageAlt="Upload document showing Tax ID number"
                    middleImageAltDone="Upload document showing Tax ID number complete"
                />}

            </div>

        </div>
    )
}

export default VerificationProcess;