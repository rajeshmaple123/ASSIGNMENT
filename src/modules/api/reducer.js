import camelCase from 'camelcase';
import ENDPOINTS from 'modules/api/endpoints';
import { API_ACTIONS } from 'modules/api/actions';

const initApi = () => {
  const reducers = {};

  Object.keys(ENDPOINTS).forEach((endpointKey) => {
    const reducer = {
      data: null,
      loading: false,
      error: null,
    };

    Object.assign(reducers, { [camelCase(endpointKey)]: reducer });
  });

  return reducers
};

export const INITIAL_STATE = initApi();

const apiReducer = (state = INITIAL_STATE, action) => {
  if (action.type.startsWith(API_ACTIONS.FETCH_START)) {
    const subReducer = camelCase(action.type.replace(API_ACTIONS.FETCH_START, ''));

    return {
      ...state,
      [subReducer]: {
        ...state[subReducer],
        loading: true,
        error: null,
      },
    };
  }

  if (action.type.startsWith(API_ACTIONS.FETCH_SUCCESS)) {
    const subReducer = camelCase(action.type.replace(API_ACTIONS.FETCH_SUCCESS, ''));

    return {
      ...state,
      [subReducer]: {
        ...state[subReducer],
        loading: false,
        error: null,
        data: action.payload,
      },
    };
  }

  if (action.type.startsWith(API_ACTIONS.FETCH_FAILURE)) {
    const subReducer = camelCase(action.type.replace(API_ACTIONS.FETCH_FAILURE, ''));

    return {
      ...state,
      [subReducer]: {
        ...state[subReducer],
        loading: false,
        error: action.payload,
      },
    };
  }
  return state;
};

export default apiReducer;
