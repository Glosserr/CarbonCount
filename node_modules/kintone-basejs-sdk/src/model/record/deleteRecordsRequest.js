/**
 * kintone api - nodejs client
 */

let app = new WeakMap();
let ids = new WeakMap();
let idsWithRevision = new WeakMap();

/**
 * DeleteRecordsRequest model
 */
class DeleteRecordsRequest {
    /**
     * @param {String} appIDInput
     * @param {String} idsInput
     */
    constructor(appIDInput) {
        app.set(this, appIDInput);
    }
    /**
     * set the ids to be deleted
     * @param {Array<Integer>} idsInput
     * @return {this}
     */
    setIDs(idsInput) {
        ids.set(this, idsInput);
        return this;
    }
    /**
     * set ids with revision
     * @param {HashTable<id, revision>} idsWithRevisionInput
     * @return {this}
     */
    setIDsWithRevision(idsWithRevisionInput) {
        idsWithRevision.set(this, idsWithRevisionInput);
        return this;
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */
    toJSON() {
        let data = {
            app: app.get(this),
        };
        if (ids.get(this)) {
            data.ids = ids.get(this);
        } else {
            let idsRequest = [];
            let revisions = [];
            let idsWithRevisionInput = idsWithRevision.get(this);
            for (const id in idsWithRevisionInput) {
                if (!idsWithRevisionInput.hasOwnProperty(id)) {
                    continue;
                }
                idsRequest.push(id);
                revisions.push(idsWithRevisionInput[id]);
            }
            data.ids = idsRequest;
            data.revisions = revisions;
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
module.exports = DeleteRecordsRequest;
