require("dotenv").config();
var express = require("express");
var employees = require("../models/combatApp.js");
var router = express.Router();
var path = require("path")
// var keys = require("../config/keys")

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/combatants", function (req, res) {
    combatants.selectAll(function (data) {
        res.json({ combatants: data });
    });
});

router.post("/combatants", function (req, res) {
    employees.insertOne([
        "name", "ac", "attack", "damageDie", "damageBonus", "currentHp", "maxHp", "strSave", "dexSave", "conSave", "intSave", "wisSave", "chaSave", "level"
    ], [
        req.body.name, req.body.ac, req.body.attack, req.body.damageDie, req.body.damageBonus, req.body.currentHp, req.body.maxHp, req.body.strSave, req.body.dexSave, req.body.conSave, req.body.intSave, req.body.wisSave, req.body.chaSave, req.body.level
    ], function (result) {
        console.log(result);
        res.json({ id: result.insertId });
    });
});

// router.put("/combatants/:id", function (req, res) {
//     var condition = "id = " + req.params.id;

//     combatants.updateOne({
//         req.body.name, req.body.ac, req.body.attack, req.body.damageDie, req.body.damageBonus, req.body.currentHp, req.body.maxHp, req.body.strSave, req.body.dexSave, req.body.conSave, req.body.intSave, req.body.wisSave, req.body.chaSave, req.body.level
//     }, condition, function (result) {
//         if (result.changedRows == 0) {
//             return res.status(404).end();
//         }
//         else {
//             res.json({ id: req.params.id });
//         }
//     });
// });

router.delete("/combatants/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    employees.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        }
        else {
            res.status(200).end();
            console.log("Combatant " + condition + " was deleted.")
        }
    });
});

router.get("/employees/:column/:colVal", function (req, res) {
    var cols = req.params.column;
    var colVal = req.params.colVal;
    console.log(cols);
    console.log(colVal);
    employees.findAllWhere(cols, colVal, function (data) {
        console.log(data);
        res.json({ employees: data });
    });
});

module.exports = router;