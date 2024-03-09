/**
 * kintone api - nodejs client
 * Record model
 */

let Record = {
    // TODO: Write unit test
    GetRecordRequest: require('./getRecordRequest'),
    // TODO: Write unit test
    GetRecordsRequest: require('./getRecordsRequest'),

    // TODO: Write unit test
    AddRecordRequest: require('./addRecordRequest'),
    // TODO: Write unit test
    AddRecordsRequest: require('./addRecordsRequest'),

    // TODO: Write unit test
    UpdateRecordRequest: require('./updateRecordRequest'),
    // TODO: Write unit test
    UpdateRecordsRequest: require('./updateRecordsRequest'),

    // TODO: Write unit test
    DeleteRecordsRequest: require('./deleteRecordsRequest'),

    // TODO: Write unit test
    UpdateRecordStatusRequest: require('./updateRecordStatusRequest'),
    // TODO: Write unit test

    // TODO: Write unit test
    UpdateRecordAssigneesRequest: require('./updateRecordAssigneesRequest'),

    // TODO: Write unit test
    RecordUpdateStatusItem: require('./recordUpdateStatusItem'),
    // TODO: Write unit test
    RecordsUpdateItem: require('./recordUpdateItem'),
    // TODO: Write unit test
    RecordsUpdateStatusItem: require('./recordUpdateStatusItem'),
    // TODO: Write unit test
    RecordsUpdateKey: require('./recordUpdateKey'),

    // TODO: Write unit test
    DeleteCommentRequest: require('./deleteCommentRequest'),
    // TODO: Write unit test
    GetCommentsRequest: require('./getCommentsRequest'),
    // TODO: Write unit test
    AddCommentRequest: require('./addCommentRequest'),
};
module.exports = Record;
