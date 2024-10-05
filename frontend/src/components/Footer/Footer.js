import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <h1 className="title">AZURE•</h1>
            <p className="footer-text">
              Blueprints for Scalable and Robust Cloud Solutions
            </p>
          </Col>
          <Col md="3">
            <h3 className="footer-subtitle">Navigate</h3>
            <Nav className="footer-nav">
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/board" tag={Link}>
                  Board
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/register-page" tag={Link}>
                  Register
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile-page" tag={Link}>
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login-page" tag={Link}>
                  Login
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <h3 className="footer-subtitle">Follow us</h3>
            <div className="social-icons">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://twitter.com/Insomea_Cloud"
                id="tooltipTwitter"
                target="_blank"
              >
                <i className="fab fa-twitter" />
                <UncontrolledTooltip delay={0} target="tooltipTwitter">
                  Twitter
                </UncontrolledTooltip>
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.facebook.com/search/top?q=insomea"
                id="tooltipFacebook"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
                <UncontrolledTooltip delay={0} target="tooltipFacebook">
                  Facebook
                </UncontrolledTooltip>
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.instagram.com/insomea/"
                id="tooltipInstagram"
                target="_blank"
              >
                <i className="fab fa-instagram" />
                <UncontrolledTooltip delay={0} target="tooltipInstagram">
                  Instagram
                </UncontrolledTooltip>
              </Button>
            </div>
          </Col>
          <Col md="3">
            <h3 className="footer-subtitle">Contact us</h3>
            <p className="footer-text">Email: info@azureblueprints.com</p>
            <p className="footer-text">Phone: +1 (123) 456-7890</p>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="text-center">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} AZURE Blueprints. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
