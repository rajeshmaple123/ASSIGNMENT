  export const SERVICES = 'services';
  export const PROVIDERS = 'providers';

  const ENDPOINTS = {
    [SERVICES]: {
      uri: '/services',
      method: 'GET'
    },
    [PROVIDERS]: {
      uri: '/providers',
      method: 'GET',
      queryParams: {
        include: 'locations,schedules.location&page[number]=1&page[size]=10'
      }
    }
  }

  export default ENDPOINTS;
