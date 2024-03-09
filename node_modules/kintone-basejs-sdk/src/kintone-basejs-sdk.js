/**
 * kintone api - nodejs client
 * kintoneSDK
 */

let kintoneSDK = {
    Record: require('./module/record/record'),
    BulkRequest: require('./module/bulkRequest/bulkRequest'),
    App: require('./module/app/app'),
    Comment: require('./module/comment/comment'),
    Connection: require('./connection/connection'),
    Auth: require('./auth/auth'),
    File: require('./module/file/file'),
    KintoneException: require('./exception/kintoneException'),
};

module.exports = kintoneSDK;
