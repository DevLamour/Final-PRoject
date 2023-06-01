import styled from "styled-components";
import BackgroundHomepageLogo from "../assets/Header3.png";

const HomePage = () => {
  return (
    <Container>
      <BackgroundOverlay />
      <Title>Welcome to Taylor’D Fit</Title>
      <WelcomeDiv>
        <Subtitle>Where all your fitness goals are Taylor’D to you.</Subtitle>
        <Description>
          Taylor’D Fit's goal is to help you become the best you can be by being
          able to develop workout plans that are not only associated with your
          skill level but with your schedule as well. Being able to keep track
          of your daily water goal will push you even closer to success with our
          water tracker. We hope to provide you with all the tools to achieve
          your goals successfully and with ease.
        </Description>
      </WelcomeDiv>
      <WorkoutDiv>
        <Title>Workout Page</Title>
        <Description>
          Our Workout page comes packed with countless GIFs that will ensure you
          develop proper form for all exercises you may need to achieve your
          goal. Through creating an account, you will be able to favorite
          anything that may pique your fitness interests.
        </Description>
      </WorkoutDiv>
      <WaterTrackerDiv>
        <Title>Water Tracker</Title>
        <Description>
          Our Water Tracker is designed to keep you in check because hydration
          plays a big role in achieving your fitness goals. Once you have
          accessed your account, the water tracker requires you to input how
          many cups of water you have drunk for the day. All the days you have
          tracked your water will appear in a list so you do not have to worry
          about remembering.
        </Description>
      </WaterTrackerDiv>
      <ContactDiv>
        <Title>Contact Us</Title>
        <Description>
          Having issues with something? Reach out to us on our Contact Us page
          and we will get back to you within 48 hours!
        </Description>
      </ContactDiv>
      <AccountDiv>
        <Title>Access Your Account</Title>
        <Description>
          Access your account and all information associated with your Taylor’D
          Fit goals.
        </Description>
      </AccountDiv>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 40px;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundHomepageLogo});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.2;
  z-index: -1;
`;

const Div = styled.div`
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const WelcomeDiv = styled(Div)`
  background-color: #dbf0ff;
`;

const WorkoutDiv = styled(Div)`
  background-color: #deedff;
`;

const WaterTrackerDiv = styled(Div)`
  background-color: #e0ebff;
`;

const ContactDiv = styled(Div)`
  background-color: #e3e8ff;
`;

const AccountDiv = styled(Div)`
  background-color: #e6e6ff;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1e2328;
  margin-bottom: 10px;
`;

const Subtitle = styled.h3`
  font-size: 20px;
  font-weight: normal;
  color: #1e2328;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #1e2328;
`;

export default HomePage;
