import { API_BASE_URL } from '../constants';

function buildUrl(urlPath) {
  return `${API_BASE_URL}/${urlPath}`;
}

class ApiError {
  constructor(errorResponse) {
    this.name = 'ApiError';
    // TODO: improve what to do with ApiError
    // eslint-disable-next-line no-console
    console.error('errorResponse', errorResponse);
  }
}

function urlFetch(urlPath, options) {
  const opts = options || {};
  opts.headers = opts.headers || {};
  if (!(opts.body instanceof FormData)) {
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
  }
  return fetch(buildUrl(urlPath), opts);
}

export async function jsonFetch(urlPath, options) {
  const response = await urlFetch(urlPath, options);
  if (response.status === 204) return undefined; // no content
  if (response.ok) return response.json();
  throw new ApiError(response);
}

export function authJsonFetchBuilder(store, getJwtToken) {
  return async function authJsonFetch(url, options) {
    const opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers.Authorization = opts.headers.Authorization || `Bearer ${getJwtToken(store.getState())}`;
    return jsonFetch(url, opts);
  };
}
