/**
 * kintone api - nodejs client
 */

let app = new WeakMap();
let records = new WeakMap();

/**
 * AddRecordsRequest model
 */
class AddRecordsRequest {
    /**
     * @param {Integer} appID
     */
    constructor(appID) {
        app.set(this, appID);
        records.set(this, []);
    }
    /**
     * @return {Integer} appID
     */
    getAppID() {
        return app.get(this);
    }
    /**
     * Add record item to execute the add multi records function
     * @param {Record} record
     * @return {this} AddRecordsRequest
     */
    addRecord(record) {
        records.set(this, records.get(this).push(record));
        return this;
    }
    /**
     * @param {Array<Record>} recordsData
     * @return {this} AddRecordsRequest
     */
    setRecords(recordsData) {
        records.set(this, recordsData);
        return this;
    }
    /**
     * @return {Array<Record>} Records
     */
    getRecordsData() {
        return records.get(this);
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        return {
            app: this.getAppID(),
            records: this.getRecordsData(),
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
module.exports = AddRecordsRequest;
