/**
 * kintone api - nodejs client
 */

let requests = new WeakMap();
/**
 * BulkRequest model
 * TODO: Unit testing
 */
class BulkRequest {
    /**
     * Constructor BulkRequest
     */
    constructor() {
        requests.set(this, []);
    }
    /**
     * Get username of BulkRequest model
     * @param {BulkRequestItem} bulkRequestItem
     * @return {this}
     */
    addRequest(bulkRequestItem) {
        let dataRequest = bulkRequestItem.toJSON ?
            bulkRequestItem.toJSON() : bulkRequestItem;
        requests.get(this).push(dataRequest);
        return this;
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        return {
            requests: requests.get(this),
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
module.exports = BulkRequest;
