/**
 * kintone api - nodejs client
 */

let id = new WeakMap();
let code = new WeakMap();
let message = new WeakMap();
let errors = new WeakMap();

/**
 * Error response model
 */
class ErrorResponse {
    /**
     * constructor
     * @param {String} idResp
     * @param {String} codeResp
     * @param {String} messageResp
     * @param {String} errorsResp
     */
    constructor(idResp, codeResp, messageResp, errorsResp) {
        this.setID(idResp);
        this.setCode(codeResp);
        this.setMessage(messageResp);
        this.setErrors(errorsResp);
    }

    /**
     * @param {Object} errs
     * @return {this}
     */
    setErrors(errs) {
        errors.set(this, errs);
        return this;
    }
    /**
     * @return {Object}
     */
    getErrors() {
        return errors.get(this);
    }
    /**
     * @param {String} mess
     * @return {this}
     */
    setMessage(mess) {
        message.set(this, mess);
        return this;
    }

    /**
     * @return {String}
     */
    getMessage() {
        return message.get(this);
    }

    /**
     * @param {String} idRsp
     * @return {this}
     */
    setID(idRsp) {
        id.set(this, idRsp);
        return this;
    }

    /**
     * @return {String}
     */
    getID() {
        return id.get(this);
    }

    /**
     * @param {String} codeResp
     * @return {this}
     */
    setCode(codeResp) {
        code.set(this, codeResp);
        return this;
    }

    /**
     * @return {String}
     */
    getCode() {
        return code.get(this);
    }
    /**
     * @return {Object}
     */
    toJSON() {
        return {
            id: this.getID(),
            code: this.getCode(),
            message: this.getMessage(),
            errors: this.getErrors() || '{}',
        };
    }
}
module.exports = ErrorResponse;
