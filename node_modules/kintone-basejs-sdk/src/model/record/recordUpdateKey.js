/**
 * kintone api - nodejs client
 */


let field = new WeakMap();
let value = new WeakMap();

/**
 * RecordUpdateKey model
 */
class RecordUpdateKey {
    /**
     * constructor
     * @param {String} fieldInput
     * @param {String} valueInput
     */
    constructor(fieldInput, valueInput) {
        field.set(this, fieldInput);
        value.set(this, valueInput);
    }
    /**
     * Get JSON struct of this model
     * @return {integer}
     */
    toJSON() {
        return {
            field: field.get(this),
            value: value.get(this),
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
module.exports = RecordUpdateKey;
