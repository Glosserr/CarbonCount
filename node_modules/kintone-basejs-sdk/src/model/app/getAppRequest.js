/**
 * kintone api - nodejs client
 */

let appID = new WeakMap();

/**
 * GetAppRequest model
 * TODO: Unit testing
 */
class GetAppRequest {
    /**
     * @param {String} appIDInput
     */
    constructor(appIDInput) {
        appID.set(this, appIDInput);
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        return {
            id: appID.get(this),
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
module.exports = GetAppRequest;
