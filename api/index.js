const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://localhost");
const db = mongo.db("todo-app");

app.post("/tasks", async (req, res) => {
    const { subject } = req.body;

    if(!subject) return res.json({ msg: "Subject is required!" });

    const result = await db.collection("tasks").insertOne({
        subject,
        done: false,
    });

    const task = await db.collection("tasks").findOne({
        _id: ObjectId(result.insertedId),
    });

    res.status(201).json(task);
});

app.get("/tasks", async (req, res) => {
    const tasks = await db.collection("tasks").find().toArray();

    res.json(tasks);
});

app.listen(8000, () => {
    console.log("Server is running on port 8000.");
});