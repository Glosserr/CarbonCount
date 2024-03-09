/**
 * kintone api - nodejs client
 */

const RecordUpdateStatusItem = require('./recordUpdateStatusItem');

let appID = new WeakMap();

/**
 * UpdateRecordStatusRequest model
 */
class UpdateRecordStatusRequest extends RecordUpdateStatusItem {
    /**
     * constructor
     * @param {String} appIDInput
     * @param {String} recordIDInput
     * @param {String} actionNameInput
     * @param {String} assigneeIDInput
     * @param {String} revisionIDInput
     */
    constructor(appIDInput, recordIDInput, actionNameInput,
        assigneeIDInput, revisionIDInput) {
        super(recordIDInput, actionNameInput, assigneeIDInput, revisionIDInput);
        appID.set(this, appIDInput);
    }
    /**
     * Get JSON struct of this model
     * @return {integer}
     */
    toJSON() {
        let data = super.toJSON();
        data.app = appID.get(this);
        return data;
    }
    /**
     * Convert this model to JSON string
     * @return {String}
     */
    toJSONString() {
        return JSON.stringify(this.toJSON());
    }
}
module.exports = UpdateRecordStatusRequest;
