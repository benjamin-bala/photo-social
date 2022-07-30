import { useReducer, useEffect } from 'react';
import { reducer, initialState } from '../Store';
import { GET_DATA } from '../utils/localstorage';
import { storeContext } from './index';

export default function StoreContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    const user = GET_DATA('user');

    if (user) {
      dispatch({ type: 'retrive_user', payload: user });
    }
  }, []);
  return (
    <storeContext.Provider value={value}>{children}</storeContext.Provider>
  );
}
