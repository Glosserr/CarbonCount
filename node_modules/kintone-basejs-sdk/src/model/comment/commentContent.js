/**
 * kintone api - nodejs client
 */

let text = new WeakMap();
let mentions = new WeakMap();

/**
 * CommentContent model
 */
class CommentContent {
    /**
     * constructor
     * @param {String} textInput
     * @param {Array<mentions>} mentionsInput
     */
    constructor(textInput, mentionsInput) {
        text.set(this, textInput);
        mentions.set(this, mentionsInput);
    }
    /**
     * Get JSON struct of this model
     * @return {integer}
     */
    toJSON() {
        let data = {
            text: text.get(this),
            mentions: [],
        };
        let mentionsArray = mentions.get(this);
        if (mentionsArray.length > 0 && mentionsArray[0].toJSON) {
            mentionsArray.forEach((mention) => {
                data.mentions.push(mention.toJSON());
            });
        } else {
            data.mentions = mentionsArray || [];
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
module.exports = CommentContent;
