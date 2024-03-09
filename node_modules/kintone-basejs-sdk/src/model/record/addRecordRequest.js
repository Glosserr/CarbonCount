/**
 * kintone api - nodejs client
 * AddRecordRequest model
 */

let app = new WeakMap();
let record = new WeakMap();
/**
 * AddRecordRequest model
 */
class AddRecordRequest {
    /**
     * constructor for AddRecordRequest
     * @param {integer} appID
     * @param {HashTable<String, FieldValue>} recordHashTableData
     */
    constructor(appID, recordHashTableData) {
        app.set(this, appID);
        record.set(this, recordHashTableData);
    }
    /**
     * Get app id
     * @return {integer}
     */
    getAppID() {
        return app.get(this);
    }
    /**
     * Get record data
     * @return {HashTable<String, FieldValue>}
     */
    getRecordData() {
        return record.get(this);
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        return {
            app: this.getAppID(),
            record: this.getRecordData(),
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
module.exports = AddRecordRequest;
