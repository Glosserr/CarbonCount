/**
 * kintone api - nodejs client
 */

let method = new WeakMap();
let api = new WeakMap();
let payload = new WeakMap();

/**
 * BulkRequestItem model
 * TODO: Unit testing
 */
class BulkRequestItem {
    /**
     * @param {String} methodInput
     * @param {String} apiInput
     * @param {String} payloadInput
     */
    constructor(methodInput, apiInput, payloadInput) {
        method.set(this, methodInput);
        api.set(this, apiInput);
        payload.set(this,
            payloadInput.toJSON ? payloadInput.toJSON() : payloadInput);
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        return {
            method: method.get(this),
            api: api.get(this),
            payload: payload.get(this),
        };
    }
    /**
     * Convert this model to JSON string
     * @return {String}
     */
    toJSONString() {
        return JSON.stringify(this.toJSON());
    }
}
module.exports = BulkRequestItem;
