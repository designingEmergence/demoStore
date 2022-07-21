import * as React from 'react';
import PropTypes from 'prop-types';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepLabel, StepConnector } from '@mui/material';
import styles from "./Stepper.module.sass";

export default function Stepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = props.steps ? props.steps : [];

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const Connector = (props) => {
        return (
            <StepConnector classes={{root: styles.connector}}/>    
        )
    }


    function StepIcon(props) {
        const { active, completed, className } = props;

        return (
            <div className={`${active && styles.active} ${styles.stepIconRoot}`}>
                <div className={styles.stepIcon} />
            </div>
        );
    }

    StepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
    };

    return (
        <MuiStepper {...props} connector={<Connector/>}>
            {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {
                    StepIconComponent: StepIcon,
                    classes: {
                        root: styles.label,
                        active: styles.active,
                        completed: styles.completed,
                    }
                };
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </MuiStepper>
    );
}