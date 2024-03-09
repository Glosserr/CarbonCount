/**
 * kintone api - nodejs client
 */

let appID = new WeakMap();

/**
 * GetFormLayoutRequest model
 * TODO: Unit testing
 */
class GetFormLayoutRequest {
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
            app: appID.get(this),
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
module.exports = GetFormLayoutRequest;
