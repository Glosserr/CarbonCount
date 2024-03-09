    /**
 * kintone api - nodejs client
 */

let fileKey = new WeakMap();

/**
 * GetFileRequest model
 * TODO: Unit testing
 */
class GetFileRequest {
    /**
     * @param {String} fileKeyInput
     */
    constructor(fileKeyInput) {
        fileKey.set(this, fileKeyInput);
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        return {
            fileKey: fileKey.get(this),
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
module.exports = GetFileRequest;
