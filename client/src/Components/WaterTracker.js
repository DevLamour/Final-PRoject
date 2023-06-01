import { useState } from "react";
import styled from "styled-components";
import { GiWaterBottle } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import waterLoading from "../assets/water-loading.gif";

const WaterTracker = ({ isLoggedIn }) => {
  const [waterAmount, setWaterAmount] = useState(16);
  const [inputValue, setInputValue] = useState("");
  const [trackedData, setTrackedData] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const decrementWaterAmount = () => {
    setWaterAmount((prevAmount) => prevAmount - inputValue);
    setInputValue("");
    const currentDate = new Date().toLocaleDateString();
    const newData = {
      date: currentDate,
      amount: inputValue,
    };
    setTrackedData((prevData) => [...prevData, newData]);
  };

  const handleReset = () => {
    setWaterAmount(16);
    setInputValue("");
    setTrackedData([]);
  };

  const EquivalentOz = waterAmount * 8.11537;
  const EquivalentLiter = waterAmount * 0.236588;

  const renderEquivalentText = () => {
    return (
      <EquivalentContainer>
        <EquivalentText>
          Equivalent in ounces: {EquivalentOz.toFixed(2)} oz
        </EquivalentText>
        <EquivalentText>
          Equivalent in liters: {EquivalentLiter.toFixed(2)} L
        </EquivalentText>
      </EquivalentContainer>
    );
  };

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <WaterBottleWrapper>
            <WaterBottle waterAmount={waterAmount} />
            <WaterAmountText>
              Here is the daily recommended cup amount in a day: {waterAmount}{" "}
              cups
            </WaterAmountText>
          </WaterBottleWrapper>
          <InputContainer>
            <InputLabel>Drink Amount (in cups):</InputLabel>
            <Input
              type="number"
              min={1}
              max={10}
              value={inputValue}
              onChange={handleInputChange}
            />
          </InputContainer>
          {renderEquivalentText()}
          <ButtonContainer>
            <Button onClick={decrementWaterAmount}>Drink</Button>
            <Button onClick={handleReset}>Reset</Button>
          </ButtonContainer>
          {waterAmount <= 0 && (
            <GoalAchievedPrompt>Goal Achieved!</GoalAchievedPrompt>
          )}
          <CalendarContainer>
            <CalendarTitle>Tracked Dates and Amounts:</CalendarTitle>
            <CalendarList>
              {trackedData.map((data, index) => (
                <CalendarItem key={index}>
                  <CalendarDate>{data.date}</CalendarDate>
                  <CalendarAmount>{data.amount} cups</CalendarAmount>
                </CalendarItem>
              ))}
            </CalendarList>
          </CalendarContainer>
        </>
      ) : (
        <LoginPrompt>
          If you want to track and save the daily usage of water, you should{" "}
          <LoginLink to="/login">login</LoginLink>.
          <LoadingWater src={waterLoading} alt="Loading Water" />
        </LoginPrompt>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WaterBottleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 300px;
`;

const WaterBottle = styled(GiWaterBottle)`
  color: #4287f5;
  font-size: 200px;
  transform: rotate(0deg);
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - ${(props) => (props.waterAmount / 15.5) * 100}%);
    background-color: #4287f5;
    transition: height 0.3s;
  }
`;

const WaterAmountText = styled.p`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #4287f5;
  text-align: center;
`;

const InputContainer = styled.div`
  margin-top: 20px;
`;

const InputLabel = styled.label`
  font-weight: bold;
  font-size: 18px;
  color: #4287f5;
`;

const Input = styled.input`
  margin-top: 10px;
  padding: 5px;
  font-size: 16px;
`;

const EquivalentContainer = styled.div`
  margin-top: 10px;
`;

const EquivalentText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4287f5;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #3a75d5;
  }
`;

const LoginPrompt = styled.p`
  margin-top: 20px;
  text-align: center;
  position: relative;
  font-size: 16px;
  color: #333;
`;

const LoginLink = styled(NavLink)`
  color: #4287f5;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #3a75d5;
  }
`;

const LoadingWater = styled.img`
  position: absolute;
  top: calc(100% + 80px);
  left: 50%;
  border-radius: 700px;
  transform: translateX(-50%);
  width: 400px;
  height: auto;
`;

const GoalAchievedPrompt = styled.p`
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  color: green;
  font-size: 20px;
`;

const CalendarContainer = styled.div`
  margin-top: 20px;
`;

const CalendarTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #4287f5;
`;

const CalendarList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const CalendarItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const CalendarDate = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;

const CalendarAmount = styled.span`
  font-size: 16px;
`;

export default WaterTracker;
