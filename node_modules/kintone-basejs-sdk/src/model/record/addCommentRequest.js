/**
 * kintone api - nodejs client
 */

let appID = new WeakMap();
let recordID = new WeakMap();
let commentContent = new WeakMap();

/**
 * AddCommentRequest model
 */
class AddCommentRequest {
    /**
     * constructor
     * @param {Initeger} appIDInput
     * @param {Initeger} recordIDInput
     * @param {String} commentContentInput
     */
    constructor(appIDInput, recordIDInput, commentContentInput) {
        appID.set(this, appIDInput);
        recordID.set(this, recordIDInput);
        commentContent.set(this, commentContentInput);
    }
    /**
     * Get JSON struct of this model
     * @return {integer}
     */
    toJSON() {
        return {
            app: appID.get(this),
            record: recordID.get(this),
            comment: commentContent.get(this),
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
module.exports = AddCommentRequest;
