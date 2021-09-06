import { APP_ACTIONS } from "modules/app/actions";

const initApp = function () {
  return {
    selectedService: null
  }
}

const actionHandlers = {
  [APP_ACTIONS.APP_FILTER_PROVIDERS]: (state, action) => {
    return {
      ...state,
      selectedService: action.filterBy
    }
  }
}

export const INITIAL_STATE = initApp();

const appReducer = function (state = INITIAL_STATE, action) {
  return actionHandlers[action.type] ? actionHandlers[action.type](state, action) : state;
}

export default appReducer;
