const handleGetWorkoutPlans = async (req, res, client, database) => {
  console.log("workout");
  try {
    const workoutPlans = await database
      .collection("WorkoutPlan")
      .find()
      .toArray();

    res.status(200).json(workoutPlans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving workout plans" });
  }
};

const handleGetWorkoutPlanById = async (req, res, client, database) => {
  const workoutPlanId = req.params.id;

  try {
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
  }
};

const handleAddWorkoutPlan = async (req, res, client, database) => {
  const newWorkoutPlan = req.body;

  try {
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
  }
};

const handleUpdateWorkoutPlan = async (req, res, client, database) => {
  const workoutPlanId = req.params.id;
  const updatedWorkoutPlan = req.body;

  try {
    const result = await database
      .collection("WorkoutPlan")
      .updateOne(
        { _id: ObjectId(workoutPlanId) },
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
  }
};

const handleDeleteWorkoutPlan = async (req, res, client, database) => {
  const workoutPlanId = req.params.id;

  try {
    const result = await database
      .collection("WorkoutPlan")
      .deleteOne({ _id: ObjectId(workoutPlanId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Workout plan deleted successfully" });
    } else {
      res.status(404).json({ message: "Workout plan not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting workout plan" });
  }
};

module.exports = {
  handleGetWorkoutPlans,
  handleGetWorkoutPlanById,
  handleAddWorkoutPlan,
  handleUpdateWorkoutPlan,
  handleDeleteWorkoutPlan,
};
