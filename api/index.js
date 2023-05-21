const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://localhost");
const db = mongo.db("todo-app");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/tasks", async (req, res) => {
    const { subject } = req.body;

    if(!subject) return res.status(400).json({ msg: "Subject is required!" });

    const result = await db.collection("tasks").insertOne({
        subject,
        done: false,
    });

    const task = await db.collection("tasks").findOne({
        _id: new ObjectId(result.insertedId),
    });

    res.status(201).json(task);
});

app.get("/tasks", async (req, res) => {
    const tasks = await db.collection("tasks").find().toArray();

    res.json(tasks);
});

app.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;

    const task = await db.collection("tasks").findOne({
        _id: new ObjectId(id),
    });

    res.json(task);
});

app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { subject } = req.body;

    if(!subject) return res.status(400).json({ msg: "Subject is required!" });

    const result = await db.collection("tasks").updateOne(
        { _id: new ObjectId(id) },
        { $set: { subject: subject } },
    );

    res.json(result);
});

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;

    const result = await db.collection("tasks").deleteOne({
        _id: new ObjectId(id),
    });

    res.status(204).json(result);
});

app.delete("/tasks", async (req, res) => {
    const result = await db.collection("tasks").deleteMany({ done: true });

    res.status(204).json(result);
});

app.put("/tasks/:id/toggle", async (req, res) => {
    const { id } = req.params;

    const result = await db.collection("tasks").find({
        _id: new ObjectId(id),
    }).toArray();

    const done = result[0].done;

    const task = await db.collection("tasks").updateOne(
        { _id: new ObjectId(id) },
        { $set: { done: !done } },
    );

    res.status(204).json(task);
});

app.listen(8000, () => {
    console.log("Server is running on port 8000.");
});