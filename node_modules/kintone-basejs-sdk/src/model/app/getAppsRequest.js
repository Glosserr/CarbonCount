/**
 * kintone api - nodejs client
 */

let appIDs = new WeakMap();
let appCodes = new WeakMap();
let appName = new WeakMap();
let appSpaceIDs = new WeakMap();
let limit = new WeakMap();
let offset = new WeakMap();

/**
 * GetAppsRequest model
 * TODO: Unit testing
 */
class GetAppsRequest {
    /**
     * @param {String} offsetInput
     * @param {String} limitInput
     */
    constructor(offsetInput, limitInput) {
        limit.set(this, limitInput);
        offset.set(this, offsetInput);
    }
    /**
     * Set app ids
     * @param {Array<Integer>} appIDsInput
     * @return {this}
     */
    setAppIDs(appIDsInput) {
        appIDs.set(this, appIDsInput);
        return this;
    }
    /**
     * Set app codes
     * @param {Array<Integer>} appCodesInput
     * @return {this}
     */
    setAppCodes(appCodesInput) {
        appCodes.set(this, appCodesInput);
        return this;
    }
    /**
     * Set app name
     * @param {Array<Integer>} appNameInput
     * @return {this}
     */
    setAppName(appNameInput) {
        appName.set(this, appNameInput);
        return this;
    }
    /**
     * Set app space ids
     * @param {Array<Integer>} appSpaceIDsInput
     * @return {this}
     */
    setAppSpaceIDs(appSpaceIDsInput) {
        appSpaceIDs.set(this, appSpaceIDsInput);
        return this;
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        let data = {
            offset: offset.get(this),
            limit: limit.get(this),
        };
        if (appIDs.get(this)) {
            data.ids = appIDs.get(this);
        }
        if (appCodes.get(this)) {
            data.codes = appCodes.get(this);
        }
        if (appName.get(this)) {
            data.name = appName.get(this);
        }
        if (appSpaceIDs.get(this)) {
            data.spaceIds = appSpaceIDs.get(this);
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
module.exports = GetAppsRequest;
