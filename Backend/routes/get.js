const app = require("express").Router();
const Database = require("better-sqlite3");
const bodyParser = require('body-parser');

const db = Database("database.db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get", handleRequest, (req, res) => {
    const getStatement = db.prepare("SELECT * FROM logs");
    const data = getStatement.all();

    res.send({
        success: true,
        data: data
    });
});

function handleRequest(req, res, next) {
    console.log("I got a GET request!")
    next();
}

module.exports = app;