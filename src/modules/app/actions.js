export const APP_ACTIONS = {
  APP_FILTER_PROVIDERS: 'APP_FILTER_PROVIDERS'
}

export const appActions = {
  filter(filterBy) {
    return {
      type: APP_ACTIONS.APP_FILTER_PROVIDERS,
      filterBy
    };
  }
}
