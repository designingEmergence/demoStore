import React, {createContext, useReducer} from 'react';

const initialState = {
  financingConfig: {
    paymentTerms: 'Monthly',
    duration: 48,
    totalCost: 48000,
    downPayment: 8539,
    financingAmount: 24660,
    costPerTerm: 6165,
    paybackPerTerm: 5665,
    interestPerTerm: 723,
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