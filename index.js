const express = require("express");
const myapp = require("./api/app");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Weather app listening on port ${PORT}!`));

app.use("/", myapp);