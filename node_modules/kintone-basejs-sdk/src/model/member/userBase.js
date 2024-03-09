/**
 * kintone api - nodejs client
 */

let name = new WeakMap();
let code = new WeakMap();

/**
 * UserBase model
 */
class UserBase {
    /**
     * @param {String} nameInput
     * @param {String} codeInput
     */
    constructor(nameInput, codeInput) {
        name.set(this, nameInput);
        code.set(this, codeInput);
    }
    /**
     * Get the name of user
     * @return {String} The name of usee
     */
    getName() {
        return name.get(this);
    }
    /**
     * Get the code of user
     * @return {String} the user ccode
     */
    getCode() {
        return code.get(this);
    }
}
module.exports = UserBase;
