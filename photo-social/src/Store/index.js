import { STORE_DATA } from '../utils/localstorage';

export let initialState = {
  search: '',
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'user':
      STORE_DATA('user', payload);
      return { ...state, user: payload };
    case 'retrive_user':
      return { ...state, user: payload };
    case 'photo':
      return { ...state, photo: payload };
    case 'store_data':
      return { ...state, ...payload };
    case 'filter':
      return { ...state, search: payload };
    default:
      return state;
  }
};
