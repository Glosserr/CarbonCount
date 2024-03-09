/**
 * kintone api - nodejs client
 */

const RecordUpdateKey = require('./recordUpdateKey');

let id = new WeakMap();
let revision = new WeakMap();
let updateKey = new WeakMap();
let record = new WeakMap();

/**
 * RecordUpdateItem model
 */
class RecordUpdateItem {
    /**
     * constructor
     */
    constructor() {}
    /**
     * set ID of record to update
     * @param {String} idInput
     * @return {this}
     */
    setID(idInput) {
        id.set(this, idInput);
        return this;
    }
    /**
     * set revision of record to update
     * @param {String} revisionInput
     * @return {this}
     */
    setRevision(revisionInput) {
        revision.set(this, revisionInput);
        return this;
    }
    /**
     * set updateKey to update record
     * @param {String} field
     * @param {String} value
     * @return {this}
     */
    setUpdateKey(field, value) {
        updateKey.set(this, new RecordUpdateKey(field, value));
        return this;
    }
    /**
     * set record data to update
     * @param {String} recordInput
     * @return {this}
     */
    setRecord(recordInput) {
        record.set(this, recordInput);
        return this;
    }
    /**
     * Get JSON struct of this model
     * @return {integer}
     */
    toJSON() {
        let updateKeyPriv = updateKey.get(this);
        let data = {
            revision: revision.get(this) || null,
            record: record.get(this),
        };
        if (updateKeyPriv) {
            data.updateKey = updateKeyPriv.toJSON();
        } else {
            data.id = id.get(this);
        }

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
module.exports = RecordUpdateItem;
