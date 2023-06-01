import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiTrash2, FiEdit } from "react-icons/fi";
import burpeesGif from "../assets/Burpees.gif";
import pushupGif from "../assets/Pushup.gif";
import plankGif from "../assets/Plank.gif";
import lungesGif from "../assets/Lunges.gif";
import jumpsquatGif from "../assets/Jumpsquat.gif";
import mountainclimbersGif from "../assets/mountain-climbers.gif";
import bikecrunchesGif from "../assets/bike-crunches.gif";
import jumpingjackGif from "../assets/jumping-jack.gif";

const WorkoutPlan = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutDescription, setNewWorkoutDescription] = useState("");
  const [newWorkoutSets, setNewWorkoutSets] = useState("");
  const [updatedWorkoutDescriptions, setUpdatedWorkoutDescriptions] = useState(
    {}
  );

  useEffect(() => {
    fetch("/workout-plans")
      .then((response) => response.json())
      .then((data) => setWorkoutData(data))
      .catch((error) => {
        console.error("Error fetching workout data:", error);
      });
  }, []);

  const deleteWorkout = (workoutId) => {
    fetch(`/workout-plans/${workoutId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetch("/workout-plans")
          .then((response) => response.json())
          .then((data) => setWorkoutData(data))
          .catch((error) => {
            console.error("Error fetching workout data:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting workout:", error);
      });
  };

  const addWorkout = (event) => {
    event.preventDefault();

    const newWorkout = {
      name: newWorkoutName,
      sets: newWorkoutSets,
      description: newWorkoutDescription,
    };

    fetch("/workout-plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout),
    })
      .then(() => {
        fetch("/workout-plans")
          .then((response) => response.json())
          .then((data) => {
            setWorkoutData(data);
            setNewWorkoutName("");
            setNewWorkoutDescription("");
            setNewWorkoutSets("");
          })
          .catch((error) => {
            console.error("Error fetching workout data:", error);
          });
      })
      .catch((error) => {
        console.error("Error adding workout:", error);
      });
  };

  const updateWorkout = (workoutId) => {
    const updatedWorkout = {
      description: updatedWorkoutDescriptions[workoutId],
    };

    fetch(`/workout-plans/${workoutId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWorkout),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedWorkouts = workoutData.map((workout) => {
          if (workout._id === workoutId) {
            return { ...workout, description: data.description };
          }
          return workout;
        });
        setWorkoutData(updatedWorkouts);
        setUpdatedWorkoutDescriptions({
          ...updatedWorkoutDescriptions,
          [workoutId]: "",
        });
      })
      .catch((error) => {
        console.error("Error updating workout:", error);
      });
  };

  const handleUpdateInputChange = (event, workoutId) => {
    const { value } = event.target;
    setUpdatedWorkoutDescriptions({
      ...updatedWorkoutDescriptions,
      [workoutId]: value,
    });
  };

  const getWorkoutGif = (workoutName) => {
    switch (workoutName) {
      case "Burpees":
        return burpeesGif;
      case "Push-ups":
        return pushupGif;
      case "Plank":
        return plankGif;
      case "Lunges":
        return lungesGif;
      case "Jump-squats":
        return jumpsquatGif;
      case "Mountain Climbers":
        return mountainclimbersGif;
      case "Bicycle Crunches":
        return bikecrunchesGif;
      case "Jumping Jacks":
        return jumpingjackGif;
      default:
        return "";
    }
  };

  const workoutColorPalette = [
    "#87ed9c",
    "#85eba3",
    "#82e8ab",
    "#80e6b2",
    "#7de3ba",
    "#7ae0c2",
    "#78dec9",
    "#75dbd1",
  ];

  return (
    <Container>
      <Title>Workout Plan</Title>
      <AddWorkoutForm onSubmit={addWorkout}>
        <Input
          type="text"
          placeholder="Workout Name"
          value={newWorkoutName}
          onChange={(event) => setNewWorkoutName(event.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Workout Description"
          value={newWorkoutDescription}
          onChange={(event) => setNewWorkoutDescription(event.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Number of Sets"
          value={newWorkoutSets}
          onChange={(event) => setNewWorkoutSets(event.target.value)}
          required
        />
        <AddButton type="submit">ADD</AddButton>
      </AddWorkoutForm>
      <WorkoutList>
        {workoutData.map((workout, index) => (
          <WorkoutItem
            key={workout._id}
            workoutColor={
              workoutColorPalette[index % workoutColorPalette.length]
            }
          >
            <WorkoutName>{workout.name}</WorkoutName>
            <WorkoutGifContainer>
              <WorkoutGif
                src={getWorkoutGif(workout.name)}
                alt={workout.name}
              />
            </WorkoutGifContainer>
            <WorkoutDescription>{workout.description}</WorkoutDescription>
            <WorkoutSets>Sets: {workout.sets}</WorkoutSets>
            <UpdateForm onSubmit={() => updateWorkout(workout._id)}>
              <Input
                type="text"
                placeholder="New Description"
                value={updatedWorkoutDescriptions[workout._id] || ""}
                onChange={(event) =>
                  handleUpdateInputChange(event, workout._id)
                }
                required
              />
              <UpdateButton type="submit">
                <FiEdit />
              </UpdateButton>
            </UpdateForm>
            <DeleteButton onClick={() => deleteWorkout(workout._id)}>
              <FiTrash2 />
            </DeleteButton>
          </WorkoutItem>
        ))}
      </WorkoutList>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const AddWorkoutForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const WorkoutList = styled.ul`
  list-style: none;
  padding: 0;
`;

const WorkoutItem = styled.li`
  background-color: ${(props) => props.workoutColor};
  margin-bottom: 10px;
  padding: 10px;
  position: relative;
`;

const WorkoutName = styled.h3`
  margin: 0;
`;

const WorkoutGifContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const WorkoutGif = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const WorkoutDescription = styled.p`
  margin: 0;
`;

const WorkoutSets = styled.p`
  margin: 0;
`;

const UpdateForm = styled.form`
  display: flex;
  margin-top: 10px;
`;

const UpdateButton = styled.button`
  margin-left: 5px;
  padding: 3px;
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 3px;
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export default WorkoutPlan;
