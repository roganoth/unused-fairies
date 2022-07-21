var orm = require("../config/orm.js");
var path = require("path");

var employees = {
    selectAll: function (cb) {
        orm.selectAll("combat", function (res) {
            cb(res);
        });
    },
    insertOne: function (cols, vals, cb) {
        orm.insertOne("combat", cols, vals, function (res) {
            cb(res);
        });
    },
    updateOne: function (objColVals, condition, cb) {
        orm.updateOne("combat", objColVals, condition, function (res) {
            cb(res);
        });
    },
    delete: function (condition, cb) {
        orm.delete("combat", condition, function (res) {
            cb(res);
        });
    }, 
    findAllWhere: function (cols, colVal, cb) {
        orm.findAllWhere("combat", cols, colVal, function (res) {
            cb(res);
        });
    }
};

module.exports = employees;