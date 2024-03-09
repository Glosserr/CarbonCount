/**
 * kintone api - nodejs client
 */

let code = new WeakMap();
let type = new WeakMap();

/**
 * CommentMention model
 */
class CommentMention {
    /**
     * constructor
     * @param {String} codeInput
     * @param {String} typeInput
     */
    constructor(codeInput, typeInput) {
        code.set(this, codeInput);
        type.set(this, typeInput);
    }
    /**
     * Get JSON struct of this model
     * @return {integer}
     */
    toJSON() {
        return {
            code: code.get(this),
            type: type.get(this),
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
module.exports = CommentMention;
