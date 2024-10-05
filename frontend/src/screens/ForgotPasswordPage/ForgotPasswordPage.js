import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = "http://localhost:3001";
  const onSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/auth/forgot-password`, {
        email,
      });
      alert("Password reset email sent successfully!");
      navigate("/login-page");
    } catch (ex) {
      console.error(ex);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
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
                      <CardTitle
                        tag="h1"
                        className="text-sm"
                        style={{ background: "#1e8af8" }}
                      >
                        reset password
                      </CardTitle>{" "}
                    </CardHeader>
                    <CardBody>
                      <p className="text-center">
                        Enter your email address, and we will send you
                        instructions on how to create a new password.
                      </p>
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

                        <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />I agree to the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                              style={{ colors: "#7956fd" }}
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
                        onClick={onSubmit}
                        disabled={loading}
                        style={{ background: "#7956fd" }}
                      >
                        {loading ? "Submit..." : "Submit"}
                      </Button>

                      {error && (
                        <div className="text-center mt-3 text-danger">
                          {error}
                        </div>
                      )}
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
