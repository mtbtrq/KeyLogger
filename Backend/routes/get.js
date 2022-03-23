const app = require("express").Router();
const Database = require("better-sqlite3");
const bodyParser = require('body-parser');

const db = Database("database.db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/get", handleRequest, (req, res) => {
    const correctPassword = process.env.PASSWORD;
    const password = req.body.password;

    if (!password) return res.send({ success: false, cause: "Your mother is a whore. Kindly insert a dildo up your ass." })

    if (password === correctPassword) {
        const getStatement = db.prepare("SELECT * FROM logs");
        const data = getStatement.all();
    
        return res.send({
            success: true,
            data: data
        });
    } else {
        return res.send({
            success: false,
            cause: "Your mother is a whore. Kindly insert a dildo up your ass."
        });
    };
});

function handleRequest(req, res, next) {
    console.log("I got a GET request!")
    next();
};

module.exports = app;