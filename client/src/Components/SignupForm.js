import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaDumbbell,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [shortPasswordError, setShortPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("You must agree to the terms of service before continuing");
    } else {
      if (password.length < 8) {
        setShortPasswordError(true);
      } else {
        if (password !== confirmPassword) {
          setPasswordMismatchError(true);
        } else {
          alert("Success!");
          // Redirect to login page
          window.location.href = "/login";
        }
      }
    }
  };

  return (
    <Wrapper>
      <Form id="form" onSubmit={handleSubmit}>
        <Title>Signup Form</Title>

        <InputContainer>
          <IconWrapper>
            <FaDumbbell />
          </IconWrapper>
          <Label htmlFor="fullName">Username:</Label>
          <Input
            type="text"
            id="fullName"
            name="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </InputContainer>

        <InputContainer>
          <IconWrapper>
            <FaEnvelope />
          </IconWrapper>
          <Label htmlFor="addies">Email address:</Label>
          <Input
            type="email"
            id="addies"
            name="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputContainer>

        <InputContainer>
          <IconWrapper>
            <FaPhone />
          </IconWrapper>
          <Label htmlFor="phoneNum">Phone number:</Label>
          <Input
            type="tel"
            id="phoneNum"
            name="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </InputContainer>

        <InputContainer>
          <IconWrapper>
            <FaLock />
          </IconWrapper>
          <Label htmlFor="psw">Password:</Label>
          <Input
            type="password"
            id="psw"
            name="psw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputContainer>

        <InputContainer>
          <IconWrapper>
            <FaLock />
          </IconWrapper>
          <Label htmlFor="confirmPsw">Confirm Password:</Label>
          <Input
            type="password"
            id="confirmPsw"
            name="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputContainer>

        <Terms>
          <Checkbox
            type="checkbox"
            id="agree"
            name="I agree to the terms of service"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <Label htmlFor="agree">
            I agree to the <a href="#">Terms of Services</a>
          </Label>
        </Terms>

        {shortPasswordError && (
          <ErrorMessage>
            Password must be at least 8 characters long
          </ErrorMessage>
        )}

        {passwordMismatchError && (
          <ErrorMessage>Passwords do not match</ErrorMessage>
        )}

        <Button type="submit">Sign up</Button>

        <Footer>
          Already have an account? <Link to="/login">Login</Link>
        </Footer>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(0, 191, 255);
`;

const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Terms = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  font-size: 14px;
`;

const Button = styled.button`
  background: #00bfff;
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const Footer = styled.div`
  margin-top: 20px;
  text-align: center;
  font-family: "Arial", sans-serif;
`;

export default SignupForm;
