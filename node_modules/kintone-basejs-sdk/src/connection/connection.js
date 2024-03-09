/**
 * kintone api - nodejs client
 */


const request = require('request-promise');

const KintoneAuth = require('../auth/auth');
const KintoneHTTPHeader = require('../model/http/httpHeader');

const CONNECTION_CONST = require('./constant');


let domain = new WeakMap();
let auth = new WeakMap();
let guestSpaceID = new WeakMap();
let headers = new WeakMap();
let options = new WeakMap();

/**
 * Connection module
 */
class Connection {
    /**
     * @param {String} domainInput
     * @param {KintoneAuth} authInput
     * @param {Integer} guestSpaceIDInput
     */
    constructor(domainInput, authInput, guestSpaceIDInput) {
        domain.set(this, domainInput);
        guestSpaceID.set(this, parseInt(guestSpaceIDInput, 10));

        headers.set(this, []);
        options.set(this, {});
        this.setAuth(authInput);
        // set default user-agent
        this.setHeader(
            CONNECTION_CONST.BASE.USER_AGENT,
            CONNECTION_CONST.BASE.USER_AGENT_BASE_VALUE
            .replace('{name}',
                process.env.npm_package_name || 'kintone-basicjs-sdk')
            .replace('{version}', process.env.npm_package_version || '(none)')
        );
    }

    /**
     * request to URL
     * @param {String} method
     * @param {String} restAPIName
     * @param {String} body
     * @return {Promise}
     */
    request(method, restAPIName, body) {
        // Set Header
        let headersRequet = {};
        // set header with credentials
        auth.get(this).createHeaderCredentials().forEach((httpHeaderObj) => {
            headersRequet[httpHeaderObj.getKey()] = httpHeaderObj.getValue();
        });
        headers.get(this).forEach((httpHeaderObj) => {
            let headerKey = httpHeaderObj.getKey();
            if (headersRequet.hasOwnProperty(headerKey) &&
                headerKey === CONNECTION_CONST.BASE.USER_AGENT) {
                headersRequet[headerKey] += ' ' + httpHeaderObj.getValue();
            } else {
                headersRequet[headerKey] = httpHeaderObj.getValue();
            }
        });

        // Set request options
        let requestOptions = options.get(this);
        requestOptions.method = String(method).toUpperCase();
        requestOptions.uri = this.getUri(restAPIName);
        requestOptions.headers = headersRequet;
        requestOptions.body = body;
        // Execute request
        return request(requestOptions);
    }
    /**
     * auto get uri for request
     * @param {String} url - api name or FQDN
     * @return {String}
     */
    getUri(url) {
        let urlFQDN = CONNECTION_CONST.BASE.SCHEMA + '://' + domain.get(this);
        let apiNameUpperCase = String(url).toUpperCase();
        if (CONNECTION_CONST.PATH.hasOwnProperty(apiNameUpperCase)) {
            urlFQDN += this.getPathURI(apiNameUpperCase);
        } else {
            urlFQDN = (!url.match(/http/)) ? urlFQDN + url : url;
        }
        return urlFQDN;
    }
    /**
     * getPathURI
     * @param {String} apiName
     * @return {String}
     */
    getPathURI(apiName) {
        let pathURI = '';
        if (guestSpaceID.get(this) > 0) {
            pathURI +=
                CONNECTION_CONST.BASE.BASE_GUEST_URL
                .replace(CONNECTION_CONST.BASE.PREFIX_API_NAME,
                    CONNECTION_CONST.PATH[apiName])
                .replace(CONNECTION_CONST.BASE.PREFIX_GUESTSPACEID,
                    guestSpaceID.get(this));
        } else {
            pathURI +=
                CONNECTION_CONST.BASE.BASE_URL
                .replace(CONNECTION_CONST.BASE.PREFIX_API_NAME,
                    CONNECTION_CONST.PATH[apiName]);
        }
        return pathURI;
    }
    /**
     * Add option for request
     * @param {String} key
     * @param {String} value
     * @return {this}
     */
    addRequestOption(key, value) {
        let currentOption = options.get(this);
        currentOption[key] = value;
        options.set(this, currentOption);
        return this;
    }
    /**
     * set header for request
     * @param {String} key
     * @param {String} value
     * @return {this}
     */
    setHeader(key, value) {
        headers.get(this,
            headers.get(this).push(new KintoneHTTPHeader(key, value)));
        return this;
    }
    /**
     * set auth for connection
     * @param {Auth} authInput
     * @return {this}
     */
    setAuth(authInput) {
        if (!(authInput instanceof KintoneAuth)) {
            throw new Error(`${authInput} not an instance of KintoneAuth`);
        }
        auth.set(this, authInput);
        return this;
    }
}
module.exports = Connection;
