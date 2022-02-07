const app = require("express")();
const cors = require("cors");
const Database = require("better-sqlite3");
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

const db = Database("database.db");
const createTableStatement = db.prepare(`
CREATE TABLE IF NOT EXISTS logs (
    log text,
    time text
)
`);
createTableStatement.run();

const main = require("./routes/main");
app.use("/", main);

const get = require("./routes/get");
app.use("/", get);

app.listen(port, () => {
    console.log(`I'm listening on port ${port}`);
});