/**
 * kintone api - nodejs client
 */

const KintoneExeption = require('../../exception/kintoneException');
const KintoneConnection = require('../../connection/connection');
const BulkRequestModel = require('../../model/bulkRequest/bulkRequest');
const BulkRequestItemModel = require('../../model/bulkRequest/bulkRequestItem');
const RecordModel = require('../../model/record/recordModel');

let connection = new WeakMap();
let bulkRequests = new WeakMap();
/**
 * BulkRequest module
 */
class BulkRequest {
    /**
     * Constructor function of BulkRequest
     * @param {Connection} connectionInput
     */
    constructor(connectionInput) {
        if (!(connectionInput instanceof KintoneConnection)) {
            throw new Error(`${connectionInput} \
                not an instance of KintoneConnection`);
        }
        connection.set(this, connectionInput);
        bulkRequests.set(this, new BulkRequestModel());
    }

    /**
     * Add the record
     * @param {Integer} app
     * @param {Record} record
     * @return {this}
     */
    addRecord(app, record) {
        let addRecordRequest =
            new RecordModel.AddRecordRequest(app, record);
        let bulkRequestItem = new BulkRequestItemModel(
            'POST',
            connection.get(this).getPathURI('RECORD'),
            addRecordRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
    }

    /**
     * Add multi records
     * @param {Integer} app
     * @param {Array<record>} records
     * @return {this}
     */
    addRecords(app, records) {
        let addRecordsRequest =
            new RecordModel.AddRecordsRequest(app);
        addRecordsRequest.setRecords(records);

        let bulkRequestItem = new BulkRequestItemModel(
            'POST',
            connection.get(this).getPathURI('RECORDS'),
            addRecordsRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
    }

    /**
     * Update the specific record by ID
     * @param {Integer} app
     * @param {Integer} id
     * @param {Record} recordData
     * @param {Integer} revision
     * @return {this}
     */
    updateRecordById(app, id, recordData, revision) {
        const updateRecordRequest =
            new RecordModel.UpdateRecordRequest(app);
        updateRecordRequest
            .setID(id)
            .setRecord(recordData)
            .setRevision(revision || 0);

        let bulkRequestItem = new BulkRequestItemModel(
            'PUT',
            connection.get(this).getPathURI('RECORD'),
            updateRecordRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
    }

    /**
     * Update the specific record by updateKey
     * @param {Integer} app
     * @param {RecordUpdateKey} updateKey
     * @param {Record} recordData
     * @param {Integer} revision
     * @return {this}
     */
    updateRecordByUpdateKey(app, updateKey, recordData, revision) {
        const updateRecordRequest =
            new RecordModel.UpdateRecordRequest(app);
        updateRecordRequest
            .setUpdateKey(updateKey.field, updateKey.value)
            .setRecord(recordData)
            .setRevision(revision || 0);

        let bulkRequestItem = new BulkRequestItemModel(
            'PUT',
            connection.get(this).getPathURI('RECORD'),
            updateRecordRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
    }

    /**
     * Update multi records
     * @param {Integer} app
     * @param {Array<RecordUpdateItem>} records
     * @return {this}
     */
    updateRecords(app, records) {
        const updateRecordsRequest =
            new RecordModel.UpdateRecordsRequest(app, records);

        let bulkRequestItem = new BulkRequestItemModel(
            'PUT',
            connection.get(this).getPathURI('RECORDS'),
            updateRecordsRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
    }

    /**
     * Delete multi records
     * @param {Integer} app
     * @param {Array<Integer>} ids
     * @return {this}
     */
    deleteRecords(app, ids) {
        const deleteRecordsRequest =
            new RecordModel.DeleteRecordsRequest(app);
        deleteRecordsRequest.setIDs(ids);
        let bulkRequestItem = new BulkRequestItemModel(
            'DELETE',
            connection.get(this).getPathURI('RECORDS'),
            deleteRecordsRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
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

        let bulkRequestItem = new BulkRequestItemModel(
            'DELETE',
            connection.get(this).getPathURI('RECORDS'),
            deleteRecordsRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
    }

    /**
     * Update assignees of the specific record
     * @param {*} app
     * @param {*} record
     * @param {Array<String>} assignees
     * @param {Integer} revision
     * @return {this}
     */
    updateRecordAssignees(app, record, assignees, revision) {
        const updateRecordRequest =
            new RecordModel.UpdateRecordAssigneesRequest(
                app, record, assignees, revision);

        let bulkRequestItem = new BulkRequestItemModel(
            'PUT',
            connection.get(this).getPathURI('RECORD_ASSIGNEES'),
            updateRecordRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
    }

    /**
     * Update status of the specific record
     * @param {Integer} app
     * @param {Integer} id
     * @param {String} action
     * @param {String} assignee
     * @param {Integer} revision
     * @return {this}
     */
    updateRecordStatus(app, id, action, assignee, revision) {
        const updateRecordRequest =
            new RecordModel.UpdateRecordStatusRequest(
                app, id, action, assignee, revision);

        let bulkRequestItem = new BulkRequestItemModel(
            'PUT',
            connection.get(this).getPathURI('RECORD_STATUS'),
            updateRecordRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
    }

    /**
     * Update status of the multi records
     * @param {Integer} app
     * @param {Array<RecordStatusUpdate>} recordsStatusUpdate
     * @return {this}
     */
    updateRecordsStatus(app, recordsStatusUpdate) {
        const updateRecordsRequest = new RecordModel.UpdateRecordsRequest(
            app, recordsStatusUpdate);

        let bulkRequestItem = new BulkRequestItemModel(
            'PUT',
            connection.get(this).getPathURI('RECORDS_STATUS'),
            updateRecordsRequest
        );
        bulkRequests.get(this).addRequest(bulkRequestItem);
        return this;
    }

    /**
     * Execute the BulkRequest and get data which is returned from kintone.
     * @return {promise}
     */
    execute() {
        return connection.get(this)
            .addRequestOption('json', true)
            .request('POST', 'BULK_REQUEST', bulkRequests.get(this).toJSON())
            .then((result) => {
                return result;
            }).catch((err) => {
                throw new KintoneExeption(err);
            });
    }
}
module.exports = BulkRequest;
