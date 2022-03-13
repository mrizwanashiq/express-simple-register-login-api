const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json())
app.use(cors());

const users = []
app.post("/register", (req, res) => {
    const existingUser = users.find(item => item.email === req.body.email)
    if (existingUser) {
        res.status(400).json({ message: "User already exists", data: req.body })
    } else {
        users.push(req.body)
        res.status(200).json({ message: "You have registered successfully", data: req.body })
    }
});

app.post("/login", (req, res) => {
    const existingUser = users.find(item => item.email === req.body.email && item.password === req.body.password)
    if (existingUser) {
        res.status(200).json({ message: "You have logged in successfully", data: existingUser })
    } else {
        res.status(400).json({ message: "Invalid email or password" })
    }
});

app.listen(8080);