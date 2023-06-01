import { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginlogo from "../assets/pink-fitness2.png";

const Login = ({ handleLogin, isLoggedIn }) => {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target && e.target.name) {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData);

    // Redirect to the last location after successful login
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      // If no last location, redirect to home
      navigate("/");
    }
  };

  const handleClear = () => {
    setFormData({});
  };

  // Redirect to home if already logged in
  if (isLoggedIn) {
    return <Link to="/" />;
  }

  return (
    <Container>
      <BackgroundLogo src={loginlogo} alt="Taylor'd Fit LoginLogo" />
      <ContentContainer>
        <Title>Login</Title>
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            required={true}
            value={formData.username || ""}
            handleChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            required={true}
            value={formData.password || ""}
            handleChange={handleChange}
          />
          <ButtonContainer>
            <SubmitButton type="submit">Login</SubmitButton>
            <ClearButton type="button" onClick={handleClear}>
              Clear
            </ClearButton>
          </ButtonContainer>
          <SignupPrompt>
            Don't have an account? <SignupLink to="/signup">Sign up</SignupLink>
          </SignupPrompt>
        </LoginForm>
      </ContentContainer>
    </Container>
  );
};

const BackgroundLogo = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #000;
  font-size: 24px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  background-color: #d1560e;
  border: none;
  border-radius: 2px;
  color: white;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e8780c;
  }

  &:active {
    background-color: #c8500e;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  background-color: #d1560e;
  border: none;
  border-radius: 2px;
  color: white;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e8780c;
  }

  &:active {
    background-color: #c8500e;
  }
`;

const SignupPrompt = styled.p`
  margin-top: 20px;
  color: #000;
`;

const SignupLink = styled(Link)`
  color: #000;
  text-decoration: underline;
  margin-left: 5px;
`;

export default Login;
