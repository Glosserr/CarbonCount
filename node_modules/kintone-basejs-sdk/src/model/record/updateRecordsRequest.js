/**
 * kintone api - nodejs client
 */

let appID = new WeakMap();
let recordsItem = new WeakMap();

/**
 * UpdateRecordsRequest model
 */
class UpdateRecordsRequest {
    /**
     * constructor
     * @param {String} appIDInput
     * @param {Array<recordsItem>} recordsItemInput
     */
    constructor(appIDInput, recordsItemInput) {
        appID.set(this, appIDInput);
        recordsItem.set(this, recordsItemInput);
    }
    /**
     * Get JSON struct of this model
     * @return {integer}
     */
    toJSON() {
        return {
            app: appID.get(this),
            records: recordsItem.get(this) || [],
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
module.exports = UpdateRecordsRequest;
