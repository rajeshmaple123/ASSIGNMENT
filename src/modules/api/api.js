import ENDPOINTS from 'modules/api/endpoints';

const BASE_URL = 'https://api.inquickerstaging.com/v3/winter.inquickerstaging.com';


class ApiFactory {
  constructor(baseURL, endpoints) {
    this.baseURL = baseURL;
    this.endpoints = endpoints;
  }

  _generateFullUrl(endpoint) {
    let params = '';
    const { queryParams, uri } = this.endpoints[endpoint];

    if (queryParams) {
      const searchParams = [];

      Object.entries(queryParams)
        .filter(([, value]) => !!value)
        .forEach(([key, value]) => searchParams.push(`${key}=${value}`));

      params = `?${searchParams.join('&')}`;
    }

    return `${this.baseURL}${uri}${params}`
  }

  async fetch(endpoint, body) {
    const url = this._generateFullUrl(endpoint);
    const { method } = this.endpoints[endpoint];

    const request = await fetch(url, { method, body });

    return await request.json()
  }
}

export default new ApiFactory(BASE_URL, ENDPOINTS);
