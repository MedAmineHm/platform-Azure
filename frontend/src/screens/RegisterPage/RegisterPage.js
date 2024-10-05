import React, { useState } from "react";
import classnames from "classnames";
import axios from "axios";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import Button from "react-bootstrap/Button";

export default function RegisterPage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [lastNameFocus, setLastNameFocus] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [firstNameFocus, setFirstNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerGoogleLoading, setRegisterGoogleLoading] = useState(false);
  const apiUrl = "http://localhost:3001";

  const onRegister = async () => {
    setRegisterLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, {
        email,
        firstName,
        lastName,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        setRegisterLoading(false);
        window.location.href = "/login-page";
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("can not register");
    }
  };

  const onRegisterWithGoogle = () => {
    try {
      setRegisterGoogleLoading(true);

      const authWindow = window.open(`${apiUrl}/auth/google/`, "_self");

      const checkAuthInterval = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkAuthInterval);

          setRegisterGoogleLoading(false);

          window.location.href = "/board";
        }
      }, 2000);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la tentative de connexion avec Google:",
        error
      );
    }
  };

  React.useEffect(() => {
    //if (localStorage.getItem("token")) navigate("/");

    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{
                      transform: `perspective(500px) rotateY(${squares7and8})`,
                      background: "#1a56a2",
                    }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square5.png")}
                      />
                      <CardTitle tag="h4">Register</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": firstNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="First Name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onFocus={(e) => setFirstNameFocus(true)}
                            onBlur={(e) => setFirstNameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": lastNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Last Name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onFocus={(e) => setLastNameFocus(true)}
                            onBlur={(e) => setLastNameFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password" // Change this line
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                          />
                        </InputGroup>

                        <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />I agree to the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                              style={{ color: "#7956fd" }}
                            >
                              terms and conditions
                            </a>
                            .
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={onRegister}
                        style={{ background: "#7956fd" }}
                        disabled={registerLoading}
                      >
                        {registerLoading ? "Register..." : "register"}
                      </Button>
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={onRegisterWithGoogle}
                        style={{ background: "#7956fd" }}
                        disabled={registerGoogleLoading}
                      >
                        {registerGoogleLoading
                          ? "Sign up with Google..."
                          : "Sign up with Google"}
                      </Button>
                      <div className="text-center">
                        <p>
                          Already have an account?{" "}
                          <Link
                            to="/login-page"
                            target="_blank"
                            style={{ color: "#7956fd" }}
                          >
                            Login here
                          </Link>
                          .
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6, background: "#1e3d89" }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6, background: "#1a498e" }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6, background: "#18356e" }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6, background: "#18356e" }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6, background: "#18356e" }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6, background: "#18356e" }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
