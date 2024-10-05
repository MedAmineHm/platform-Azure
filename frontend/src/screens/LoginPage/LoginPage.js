import React, { useState, useEffect } from "react";
import classnames from "classnames";
import axios from "axios";
import { Link } from "react-router-dom";

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
import Button from "react-bootstrap/Button";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [error] = useState(null); // Add setError state
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginGoogleLoading, setLoginGoogleLoading] = useState(false);
  const apiUrl = "http://localhost:3001";

  const onLogin = async () => {
    setLoginLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        setLoginLoading(false);
        window.location.href = "/board";
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("can not login");
    }
  };

  const onLoginWithGoogle = () => {
    try {
      setLoginGoogleLoading(true);

      const authWindow = window.open(`${apiUrl}/auth/google/`, "_self");

      const checkAuthInterval = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkAuthInterval);

          setLoginGoogleLoading(false);

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

  useEffect(() => {
    //if (localStorage.getItem("token")) navigate("/");

    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);

    return () => {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);

  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;

    setSquares1to6(
      `perspective(500px) rotateY(${posX * 0.05}deg) rotateX(${
        posY * -0.05
      }deg)`
    );
    setSquares7and8(
      `perspective(500px) rotateY(${posX * 0.02}deg) rotateX(${
        posY * -0.02
      }deg)`
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
                    style={{
                      transform: `perspective(500px) rotateY(${squares7and8})`,
                    }}
                  />

                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square5.png")}
                        style={{ background: "#1f2251" }}
                      />
                      <CardTitle tag="h4">Login</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
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
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
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
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
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
                    <CardFooter className="text-center">
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={onLogin}
                        disabled={loginLoading}
                        style={{ background: "#7956fd" }}
                      >
                        {loginLoading ? "Logging in..." : "Login"}
                      </Button>

                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={onLoginWithGoogle}
                        disabled={loginGoogleLoading}
                        style={{ background: "#7956fd" }}
                      >
                        {loginGoogleLoading
                          ? "Logging in..."
                          : "Sign In With Google"}
                      </Button>

                      {error && (
                        <div className="text-center mt-3 text-danger">
                          {error}
                        </div>
                      )}

                      <div className="text-center mt-3">
                        <Link
                          to="/forgot-password/:email"
                          style={{ color: "#7956fd" }}
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="text-center mt-3">
                        <p>
                          Don't have an account?{" "}
                          <Link
                            to="/register-page"
                            style={{ color: "#7956fd" }}
                          >
                            {" "}
                            Register here
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
