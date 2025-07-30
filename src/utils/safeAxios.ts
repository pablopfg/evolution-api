import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Create an Axios instance with security protections.
 * - Disables automatic XSRF header injection.
 * - Ensures requests stay within the configured baseURL.
 */
export function createSafeAxios(config: AxiosRequestConfig = {}): AxiosInstance {
  const instance = axios.create({
    xsrfCookieName: undefined,
    xsrfHeaderName: undefined,
    ...config,
  });

  instance.interceptors.request.use((cfg) => {
    if (cfg.baseURL && cfg.url) {
      try {
        const resolved = new URL(cfg.url, cfg.baseURL);
        if (!resolved.href.startsWith(cfg.baseURL)) {
          throw new Error('Request URL outside of baseURL');
        }
        cfg.url = resolved.pathname + resolved.search + resolved.hash;
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return cfg;
  });

  return instance;
}
