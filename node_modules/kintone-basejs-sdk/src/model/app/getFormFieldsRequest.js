/**
 * kintone api - nodejs client
 */

let appID = new WeakMap();
let lang = new WeakMap();

/**
 * GetFormFieldsRequest model
 * TODO: Unit testing
 */
class GetFormFieldsRequest {
    /**
     * @param {Integer} appIDInput
     * @param {String} langInput
     */
    constructor(appIDInput, langInput) {
        appID.set(this, appIDInput);
        lang.set(this, langInput);
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        let data = {
            app: appID.get(this),
        };
        if (lang.get(this)) {
            data.lang = lang.get(this);
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
module.exports = GetFormFieldsRequest;
