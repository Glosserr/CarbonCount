/**
 * kintone api - nodejs client
 */

let recordID = new WeakMap();
let action = new WeakMap();
let assignee = new WeakMap();
let revision = new WeakMap();

/**
 * UpdateRecordStatusRequest model
 */
class UpdateRecordStatusItem {
    /**
     * constructor
     * @param {String} recordIDInput
     * @param {String} actionNameInput
     * @param {String} assigneeIDInput
     * @param {String} revisionIDInput
     */
    constructor(recordIDInput, actionNameInput,
        assigneeIDInput, revisionIDInput) {
        recordID.set(this, recordIDInput);
        action.set(this, actionNameInput);
        assignee.set(this, assigneeIDInput);
        revision.set(this, revisionIDInput);
    }
    /**
     * Get JSON struct of this model
     * @return {integer}
     */
    toJSON() {
        return {
            id: recordID.get(this),
            action: action.get(this),
            assignee: assignee.get(this),
            revision: revision.get(this) || null,
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
module.exports = UpdateRecordStatusItem;
