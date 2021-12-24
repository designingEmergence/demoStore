import React, {createContext, useReducer} from 'react';

const initialState = {
  financingType: '',
  financingConfig: {
    paymentTerms: 'Monthly',
    duration: 48,
    totalCost: 48000,
    downPayment: 200,
    financingAmount: 1199,
    costPerTerm: 60,
    paybackPerTerm: 58,
    interestPerTerm: 2,
    interestRate: 0.03,
  },
  extras: [],
  shippingMethod: {
    name: 'Deliver to the dealer',
    price: 0,
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
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, StateProvider };