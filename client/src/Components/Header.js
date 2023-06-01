import styled from "styled-components";
import { Link } from "react-router-dom";
import headerLogo from "../assets/Header1.png";

const Header = ({ isLoggedIn }) => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <Title>Taylor'd Fit</Title>
      </TitleContainer>

      <nav>
        <Ul>
          <Li>
            <FeatureIcon>🌟</FeatureIcon>
            <StyledLink to="/">Home</StyledLink>
          </Li>
          <Li>
            <FeatureIcon>🏋️</FeatureIcon>
            <StyledLink to="/workout">Workout Plan</StyledLink>
          </Li>
          <Li>
            <FeatureIcon>💧</FeatureIcon>
            <StyledLink to="/water">Water Tracker</StyledLink>
          </Li>
          <Li>
            <FeatureIcon>📞</FeatureIcon>
            <StyledLink to="/contact">Contact Us</StyledLink>
          </Li>
          {!isLoggedIn && (
            <li>
              <FeatureIcon>🔒</FeatureIcon>
              <StyledLink to="/login">Login</StyledLink>
            </li>
          )}
        </Ul>
      </nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f5f5;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Splash", cursive;
  font-size: 36px;
  color: #333;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
`;

const Li = styled.li`
  display: block;
  margin-right: 15px;
`;

const FeatureIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #f9a5d7;
  }
`;

HeaderContainer.defaultProps = {
  style: {
    background: `url(${headerLogo}) no-repeat center center`,
    backgroundSize: "cover",
  },
};

export default Header;
