/**
 * kintone api - nodejs client
 */

let app = new WeakMap();
let id = new WeakMap();

/**
 * GetRecordRequest model
 */
class GetRecordRequest {
    /**
     * @param {Integer} appID
     * @param {Integer} recordID
     */
    constructor(appID, recordID) {
        app.set(this, appID);
        id.set(this, recordID);
    }
    /**
     * @return {Integer}
     */
    getRecordID() {
        return id.get(this);
    }
    /**
     * @return {Integer}
     */
    getAppID() {
        return app.get(this);
    }
    /**
     * @return {Object}
     */
    toJSON() {
        return {
            app: this.getAppID(),
            id: this.getRecordID(),
        };
    }
    /**
     * @return {String}
     */
    toJSONString() {
        return JSON.stringify(this.toJSON());
    }
}
module.exports = GetRecordRequest;
