const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const workoutData = [
  {
    name: "Push-ups",
    description: "Do 3 sets of 10 push-ups",
    gif: "/assets/Pushup.gif",
  },
  {
    name: "Jump-squats",
    description: "Do 3 sets of 12 jump-squats",
    gif: "/assets/Jumpsquat.gif",
  },
  {
    name: "Plank",
    description: "Hold a plank for 1 minute",
    gif: "/assets/Plank.gif",
  },
  {
    name: "Lunges",
    description: "Do 3 sets of 10 lunges per leg",
    gif: "/assets/Lunges.gif",
  },
  {
    name: "Burpees",
    description: "Do 3 sets of 8 burpees",
    gif: "/assets/Burpees.gif",
  },
  {
    name: "Mountain Climbers",
    description: "Do 3 sets of 20 mountain climbers",
    gif: "/assets/mountain-climbers.gif",
  },
  {
    name: "Jumping Jacks",
    description: "Do 3 sets of 15 jumping jacks",
    gif: "/assets/jumping-jack.gif",
  },
  {
    name: "Bicycle Crunches",
    description: "Do 3 sets of 20 bicycle crunches",
    gif: "/assets/bike-crunches.gif",
  },
];

const batchImport = async () => {
  const client = new MongoClient(
    "mongodb+srv://devL:DevL9498@cluster0.pykp6xb.mongodb.net/?retryWrites=true&w=majority?",
    options
  );
  try {
    await client.connect();
    const database = client.db("TaylordFit");
    console.log("Connected to MongoDB");

    const workoutResult = await database
      .collection("WorkoutPlan")
      .insertMany(workoutData);

    console.log(workoutResult);
    console.log("Workout data imported successfully");
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("Disconnected from MongoDB");
  }
};

batchImport();
