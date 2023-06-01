const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(cors());
app.use(express.json());

// Get all workout plans
app.get("/workout-plans", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const database = client.db("TaylordFit");
    const workoutPlans = await database
      .collection("WorkoutPlan")
      .find()
      .toArray();

    res.status(200).json(workoutPlans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving workout plans" });
  } finally {
    client.close();
  }
});

// Get a specific workout plan by ID
app.get("/workout-plans/:id", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const workoutPlanId = req.params.id;

  try {
    await client.connect();
    const database = client.db("TaylordFit");
    const workoutPlan = await database
      .collection("WorkoutPlan")
      .findOne({ _id: ObjectId(workoutPlanId) });

    if (workoutPlan) {
      res.status(200).json(workoutPlan);
    } else {
      res.status(404).json({ message: "Workout plan not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving workout plan" });
  } finally {
    client.close();
  }
});

// Add a new workout plan
app.post("/workout-plans", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const newWorkoutPlan = req.body;

  try {
    await client.connect();
    const database = client.db("TaylordFit");
    const result = await database
      .collection("WorkoutPlan")
      .insertOne(newWorkoutPlan);

    if (result.insertedCount === 1) {
      res.status(201).json({ message: "Workout plan created successfully" });
    } else {
      res.status(500).json({ message: "Error creating workout plan" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating workout plan" });
  } finally {
    client.close();
  }
});

// Update a workout plan
app.put("/workout-plans/:id", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const workoutPlanId = req.params.id;
  const updatedWorkoutPlan = req.body;

  try {
    await client.connect();
    const database = client.db("TaylordFit");
    const result = await database
      .collection("WorkoutPlan")
      .updateOne(
        { _id: new ObjectId(workoutPlanId) },
        { $set: updatedWorkoutPlan }
      );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Workout plan updated successfully" });
    } else {
      res.status(404).json({ message: "Workout plan not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating workout plan" });
  } finally {
    client.close();
  }
});

// Delete a workout plan
app.delete("/workout-plans/:id", async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const workoutPlanId = req.params.id;

  try {
    await client.connect();
    const database = client.db("TaylordFit");
    const result = await database
      .collection("WorkoutPlan")
      .deleteOne({ _id: new ObjectId(workoutPlanId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Workout plan deleted successfully" });
    } else {
      res.status(404).json({ message: "Workout plan not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting workout plan" });
  } finally {
    client.close();
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
