import axios from "axios";

// below object holds default service broker's headers
const defaultHeaders = {};

/**
 * @typedef {Object} Config 
 * @property {string} method request method(GET, POST, PUT, PATCH, DELETE) to be used when making the request. Default is 'GET'
 * @property {Object} headers custom headers to be sent
 * @property {Object} body data to be sent as the request body. Only applicable for request methods 'PUT', 'POST', and 'PATCH'
 * @property {number} timeout number of milliseconds before the request times out. Default is '0' (no timeout)
 * @property {boolean} withCredentials indicates whether or not cross-site Access-Control requests. Default is 'false'
 * @property {function} onUploadProgress allows handling of progress events for uploads
 * @property {function} onDownloadProgress llows handling of progress events for downloads
 * @property {Object} signal represents a signal object that allows you to communicate with a fetch request to abort.
 */

/**
 * @description
 * Seeks url and supporting configuration object for the request to be made.
 * If url is null or undefined, logging a console error.
 * Merge headers passed in config object with the default headers that service broker maintain.
 * Call axios with the prepared config object
 * 
 * @param {string} url endpoint url
 * @param {Config} config {@link Config} object which supports additional data for network call
 * @returns {*} returns the promise object returned by axios
 * @example fetch('http://www.domain.com/employees', {method: 'GET'})
 */
export const fetch = (url, config) => {
    if(url == null) { /* ≈ to (url === null || url === undefined) */
        window.console.error('Error: url passed to Service Broker fetch is null (or) undefined');
    }
    let {body, signal, headers, ...restConfig} = config;
    return axios({
        ...restConfig,
        url,
        data: body,
        cancelToken: signal,
        /* merging headers from config object with default service broker object.
        Any duplicates? --> 'config' headers will override the default ones */
        headers: {...defaultHeaders, ...headers}
    });
}

/**
 * @description
 * returns the axios cancelToken source object
 * 
 * @returns {*} returns the axios cancelToken source object
 * 
 */
export const getCancelTokenSource = () => {
    return axios.CancelToken.source();
}

/**
 * @description
 * when promise is rejected, this function helps to check if it's because the request was cancelled
 * 
 * @param {*} error error object when promise rejects
 * @returns {boolean} returns true/false by calling axios.isCancel for given error object
 */
export const isFetchCanceled = (error) => {
    return axios.isCancel(error);
}
