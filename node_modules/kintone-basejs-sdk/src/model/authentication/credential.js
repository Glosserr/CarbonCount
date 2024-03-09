/**
 * kintone api - nodejs client
 */

let username = new WeakMap();
let password = new WeakMap();
/**
 * Credential model
 */
class Credential {
    /**
     * @param {String} usernameString
     * @param {String} passwordString
     */
    constructor(usernameString, passwordString) {
        username.set(this, usernameString);
        password.set(this, passwordString);
    }
    /**
     * Get username of Credential model
     * @return {String}
     */
    getUsername() {
        return username.get(this);
    }
    /**
     * Get password of Credential model
     * @return {String}
     */
    getPassword() {
        return password.get(this);
    }
}
module.exports = Credential;
