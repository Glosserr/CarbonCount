/**
 * kintone api - nodejs client
 */


let key = new WeakMap();
let value = new WeakMap();
/**
 * HTTPHeader model
 */
class HTTPHeader {
    /**
     * @param {String} keyInput
     * @param {String} valueInput
     */
    constructor(keyInput, valueInput) {
        key.set(this, keyInput);
        value.set(this, valueInput);
    }
    /**
     * get header key
     * @return {this}
     */
    getKey() {
        return key.get(this);
    }
    /**
     * get header value
     * @return {this}
     */
    getValue() {
        return value.get(this);
    }
}
module.exports = HTTPHeader;
