/**
 * kintone api - nodejs client
 */

let app = new WeakMap();
let query = new WeakMap();
let fields = new WeakMap();
let totalCount = new WeakMap();

/**
 * GetRecordsRequest model
 */
class GetRecordsRequest {
    /**
     * @param {Integer} appID
     * @param {String} queryInput
     * @param {Array<String>} fieldsInput
     * @param {Boolean} totalCountInput
     */
    constructor(appID, queryInput, fieldsInput, totalCountInput) {
        app.set(this, appID);
        query.set(this, queryInput);
        fields.set(this, fieldsInput);
        totalCount.set(this, totalCountInput);
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        return {
            app: app.get(this),
            query: query.get(this),
            fields: fields.get(this),
            totalCount: totalCount.get(this),
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
module.exports = GetRecordsRequest;
