import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillPhone, AiOutlineMail, AiFillHome } from "react-icons/ai";
import logo from "../assets/MainLogo.png";

const ContactUs = () => {
  const googleMapsUrl =
    "https://maps.google.com/maps?q=123+Workout+Street%2C+Fitness+City%2C+12345";

  return (
    <Container>
      <BackgroundLogo src={logo} alt="Taylor'd Fit Logo" />
      <Content>
        <Title>Contact Us</Title>
        <ContactDetails>
          <ContactItem>
            <ContactIcon>
              <AiFillHome />
            </ContactIcon>
            <ContactText>
              <strong>Company Address:</strong>
              <AddressLink
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                123 Workout Street, Fitness City, 12345
              </AddressLink>
            </ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <AiFillPhone />
            </ContactIcon>
            <ContactText>
              <strong>Phone Number:</strong>
              <p>(123) 456-7890</p>
            </ContactText>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <AiOutlineMail />
            </ContactIcon>
            <ContactText>
              <strong>Email:</strong>
              <EmailLink href="mailto:info@taylordfit.com">
                info@taylordfit.com
              </EmailLink>
            </ContactText>
          </ContactItem>
        </ContactDetails>
        <BackLink to="/">Go Back</BackLink>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const BackgroundLogo = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: -1;
`;

const Content = styled.div`
  text-align: center;
  color: #000;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: "Splash", cursive;
  font-size: 36px;
  font-weight: bold;
`;

const ContactDetails = styled.div`
  margin-bottom: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ContactIcon = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

const ContactText = styled.div`
  text-align: left;
`;

const AddressLink = styled.a`
  text-decoration: underline;
  color: blue;
`;

const EmailLink = styled.a`
  text-decoration: underline;
  color: blue;
`;

const BackLink = styled(Link)`
  display: inline-block;
  padding: 8px 16px;
  background-color: #fff;
  color: #000;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export default ContactUs;
