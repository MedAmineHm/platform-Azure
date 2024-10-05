import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import Button from "react-bootstrap/Button";
import "./nav.css";

export default function IndexNavbar() {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseOut, setCollapseOut] = useState("");
  const [color, setColor] = useState("navbar-transparent");
  const [loginLoading, setLoginLoading] = useState(false);
  const [startForFreeLoading, setStartForFreeLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  const handleLogin = () => {
    setLoginLoading(true);

    setTimeout(() => {
      setLoginLoading(false);
      window.location.href = "/login-page";
    }, 2000);
  };

  const handleStartForFree = () => {
    setStartForFreeLoading(true);

    setTimeout(() => {
      setStartForFreeLoading(false);
      window.location.href = "/login-page";
    }, 2000);
  };

  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };

  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };

  const onCollapseExited = () => {
    setCollapseOut("");
  };

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>AZURE• </span>
            Architecture Design
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Blueprints for Scalable and Robust Cloud Solutions
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Azure•Blueprints
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
                style={{ backgroundColor: "#3498db", color: "white" }}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                Getting started
              </DropdownToggle>

              <DropdownMenu className="dropdown-with-icons">
                <DropdownItem tag={Link} to="/register-page">
                  <i className="tim-icons icon-bullet-list-67" />
                  Register Page
                </DropdownItem>
                <DropdownItem tag={Link} to="/board">
                  <i className="tim-icons icon-image-02" />
                  Board Page
                </DropdownItem>
                <DropdownItem tag={Link} to="/profile-page">
                  <i className="tim-icons icon-single-02" />
                  Profile Page
                </DropdownItem>
                <DropdownItem tag={Link} to="/login-page">
                  <i className="tim-icons icon-single-02" />
                  Login Page
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/Insomea_Cloud"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/search/top?q=insomea"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square" />
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/search/top?q=insomea"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram" />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>

            <Nav
              className="navbar-nav ml-auto"
              navbar
              style={{ marginLeft: "auto", marginRight: "0" }}
            >
              <NavItem className="p-0">
                <Button
                  color="primary"
                  tag={Link}
                  to="/login-page"
                  style={{ background: "#2d2d2d" }}
                  disabled={loginLoading}
                  onClick={handleLogin}
                >
                  {loginLoading ? "Login..." : "Login"}
                </Button>
              </NavItem>
              <NavItem className="p-0">
                <Button
                  color="primary"
                  tag={Link}
                  to="/login-page"
                  style={{ background: "#2d2d2d" }}
                  disabled={startForFreeLoading}
                  onClick={handleStartForFree}
                >
                  {startForFreeLoading ? "Start for free..." : "Start for free"}
                </Button>
              </NavItem>
            </Nav>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
