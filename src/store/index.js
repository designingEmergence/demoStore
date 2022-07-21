import React, {createContext, useReducer} from 'react';

const initialState = {
  financingType: '',
  interestRate: 0.03,
  financingConfig: {
    paymentTerms: 'Monthly',
    duration: 48,
    totalCost: 48000,
    downPayment: 200,
    financingAmount: 1199,
    costPerTerm: 60,
    paybackPerTerm: 58,
    interestPerTerm: 2,
  },
  extras: [],
  shippingMethod: {
    name: 'Free delivery',
    price: 0,
  },
  login: {
    email: "",
    isSignator: 'No',
    signatoryName: "",
    signatoryEmail: "",
    rememberMe: false,
  },
  signatoryAuthority: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    consent: false,
    hasSignatory: false,
  }
}
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_FINANCING_CONFIGURATION':
        const financingState = { ...state, financingConfig: action.payload };
        return financingState;
      case 'SET_FINANCING_TYPE':
        const financingTypeState = { ...state, financingType: action.payload };
        return financingTypeState;
      case 'SET_EXTRAS':
        const extrasState = { ...state, extras: action.payload };
        return extrasState;
      case 'SET_SHIPPING_METHOD':
        const shippingState = { ...state, shippingMethod: action.payload };
        return shippingState;
      case 'SET_SIGNATORY_AUTHORITY':
        const signatoryAuthorityState = { ...state, signatoryAuthority: action.payload };
        return signatoryAuthorityState;
      case 'SET_LOGIN':
        const loginState = { ...state, login: action.payload };
        return loginState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, StateProvider };