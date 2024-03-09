/**
 * kintone api - nodejs client
 * Record module
 */

const KintoneExeption = require('../../exception/kintoneException');
const KintoneConnection = require('../../connection/connection');
const RecordModel = require('../../model/record/recordModel');

let connection = new WeakMap();

/**
 * Record module
 */
class Record {
    /**
     * The constructor for Record module
     * @param {Connection} connectionInput
     */
    constructor(connectionInput) {
        if (!(connectionInput instanceof KintoneConnection)) {
            throw new Error(`${connectionInput}` +
                `not an instance of kintoneConnection`);
        }
        connection.set(this, connectionInput);
    }

    /**
     * @param {String} method
     * @param {String} url
     * @param {RecordModle} model
     * @return {Promise} Promise
     */
    getDataBy(method, url, model) {
        let body = model.toJSON ? model.toJSON() : model;
        return connection.get(this)
            .addRequestOption('json', true)
            .request(method, url, body)
            .then((result) => {
                return result;
            }).catch((err) => {
                throw new KintoneExeption(err);
            });
    }
    /**
     * Get record by specific ID
     * TODO: Parse to response model
     * @param {Integer} app
     * @param {Integer} id
     * @return {Promise} Promise
     */
    getRecord(app, id) {
        let getRecordRequest = new RecordModel.GetRecordRequest(app, id);
        return this.getDataBy('GET', 'record', getRecordRequest);
    }
    /**
     * Get multi record with options
     * TODO: Parse to response model
     * @param {Integer} app
     * @param {String} query
     * @param {Array<String>} fields
     * @param {Boolean} totalCount
     * @return {Promise} Promise
     */
    getRecords(app, query, fields, totalCount) {
        let getRecordsRequest =
            new RecordModel.GetRecordsRequest(app, query, fields, totalCount);
        return this.getDataBy('GET', 'records', getRecordsRequest);
    }
    /**
     * Add the record
     * @param {Integer} app
     * @param {Record} record
     * @return {Promise} Promise
     */
    addRecord(app, record) {
        let addRecordRequest =
            new RecordModel.AddRecordRequest(app, record);
        return this.getDataBy('POST', 'record', addRecordRequest);
    }

    /**
     * Add multi records
     * @param {Integer} app
     * @param {Array<record>} records
     * @return {Promise} Promise
     */
    addRecords(app, records) {
        let addRecordsRequest =
            new RecordModel.AddRecordsRequest(app);
        addRecordsRequest.setRecords(records);
        return this.getDataBy('POST', 'records', addRecordsRequest);
    }

    /**
     * Update the specific record by ID
     * @param {Integer} app
     * @param {Integer} id
     * @param {Record} recordData
     * @param {Integer} revision
     * @return {Promise} Promise
     */
    updateRecordById(app, id, recordData, revision) {
        const updateRecordRequest =
            new RecordModel.UpdateRecordRequest(app);

        updateRecordRequest
            .setID(id)
            .setRecord(recordData)
            .setRevision(revision || 0);

        return this.getDataBy('PUT', 'record', updateRecordRequest);
    }


    /**
     * Update the specific record by updateKey
     * @param {Integer} app
     * @param {RecordUpdateKey} updateKey
     * @param {Record} recordData
     * @param {Integer} revision
     * @return {Promise} Promise
     */
    updateRecordByUpdateKey(app, updateKey, recordData, revision) {
        const updateRecordRequest =
            new RecordModel.UpdateRecordRequest(app);

        updateRecordRequest
            .setUpdateKey(updateKey.field, updateKey.value)
            .setRecord(recordData)
            .setRevision(revision || 0);

        return this.getDataBy('PUT', 'record', updateRecordRequest);
    }
    /**
     * create record Item With id, use to update multi Record
     * @param {*} id
     * @param {*} recordData
     * @param {*} revision
     * @return {RecordsUpdateItem}
     */
    createRecordItemWithID(id, recordData, revision) {
        return new RecordModel.RecordsUpdateItem()
            .setID(id)
            .setRecord(recordData)
            .setRevision(revision || 0);
    }
    /**
     * create record Item With UpdateKey, use to update multi Record
     * @param {*} updateKey
     * @param {*} recordData
     * @param {*} revision
     * @return {RecordsUpdateItem}
     */
    createRecordItemWithUpdateKey(updateKey, recordData, revision) {
        return new RecordModel.RecordsUpdateItem()
            .setUpdateKey(updateKey.field, updateKey.value)
            .setRecord(recordData)
            .setRevision(revision || 0);
    }
    /**
     * Update multi records
     * @param {Integer} app
     * @param {Array<RecordUpdateItem>} records
     * @return {Promise} Promise
     */
    updateRecords(app, records) {
        const updateRecordsRequest =
            new RecordModel.UpdateRecordsRequest(app, records);

        return this.getDataBy('PUT', 'records', updateRecordsRequest);
    }

    /**
     * Delete multi records
     * @param {Integer} app
     * @param {Array<Integer>} ids
     * @return {Promise} Promise
     */
    deleteRecords(app, ids) {
        const deleteRecordsRequest =
            new RecordModel.DeleteRecordsRequest(app);
        deleteRecordsRequest.setIDs(ids);
        return this.getDataBy('DELETE', 'records', deleteRecordsRequest);
    }

    /**
     * Delete records at the specific revision
     * @param {Integer} app
     * @param {HashTable <Integer, Integer>} idsWithRevision
     * @return {this}
     */
    deleteRecordsWithRevision(app, idsWithRevision) {
        const deleteRecordsRequest =
            new RecordModel.DeleteRecordsRequest(app);
        deleteRecordsRequest.setIDsWithRevision(idsWithRevision);

        return this.getDataBy('DELETE', 'records', deleteRecordsRequest);
    }

    /**
     * Update assignees of the specific record
     * @param {*} app
     * @param {*} record
     * @param {Array<String>} assignees
     * @param {Integer} revision
     * @return {Promise}
     */
    updateRecordAssignees(app, record, assignees, revision) {
        const updateRecordRequest =
            new RecordModel.UpdateRecordAssigneesRequest(
                app, record, assignees, revision);

        return this.getDataBy('PUT', 'RECORD_ASSIGNEES', updateRecordRequest);
    }

    /**
     * Update status of the specific record
     * @param {Integer} app
     * @param {Integer} id
     * @param {String} action
     * @param {String} assignee
     * @param {Integer} revision
     * @return {Promise}
     */
    updateRecordStatus(app, id, action, assignee, revision) {
        const updateRecordRequest =
            new RecordModel.UpdateRecordStatusRequest(
                app, id, action, assignee, revision);

        return this.getDataBy('PUT', 'RECORD_STATUS', updateRecordRequest);
    }

    /**
     * Update status of the multi records
     * @param {Integer} app
     * @param {Array <RecordStatusUpdate>} recordsStatusUpdate
     * @return {Promise}
     */
    updateRecordsStatus(app, recordsStatusUpdate) {
        const updateRecordsRequest = new RecordModel.UpdateRecordsRequest(
            app, recordsStatusUpdate);

        return this.getDataBy('PUT', 'RECORDS_STATUS', updateRecordsRequest);
    }
    /**
     * createRecordStatusItem for use with update multi record status
     * @param {Integer} recordIDInput
     * @param {String} actionNameInput
     * @param {String} assigneeIDInput
     * @param {String} revisionIDInput
     * @return {RecordsUpdateStatusItem}
     */
    createRecordStatusItem(recordIDInput, actionNameInput,
        assigneeIDInput, revisionIDInput) {
        return new RecordModel.RecordsUpdateStatusItem(
            recordIDInput, actionNameInput,
            assigneeIDInput, revisionIDInput);
    }
    /**
     * Get comments of the specific record
     * @param {Integer} app
     * @param {Integer} record
     * @param {string} order  {asc|desc}
     * @param {Integer} offset
     * @param {Integer} limit
     * @return {Promise}
     */
    getComments(app, record, order, offset, limit) {
        let getCommentsRequest = new RecordModel.GetCommentsRequest(
            app, record, order, offset, limit);
        return this.getDataBy('GET', 'RECORD_COMMENTS', getCommentsRequest);
    }

    /**
     * Add new comment to the specific record
     * @param {Integer} app
     * @param {Integer} record
     * @param {CommentContent} comment
     * @return {Promise}
     */
    addComment(app, record, comment) {
        let addCommentRequest = new RecordModel.AddCommentRequest(
            app, record, comment);
        return this.getDataBy('POST', 'RECORD_COMMENT', addCommentRequest);
    }

    /**
     *
     * @param {Integer} app
     * @param {Integer} record
     * @param {Integer} comment
     * @return {Promise}
     */
    deleteComment(app, record, comment) {
        let deleteCommentRequest = new RecordModel.DeleteCommentRequest(
            app, record, comment);
        return this.getDataBy('DELETE', 'RECORD_COMMENT', deleteCommentRequest);
    }
}
module.exports = Record;
