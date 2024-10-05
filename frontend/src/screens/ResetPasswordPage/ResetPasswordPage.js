import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  CardTitle,
  Alert, // Add this import for displaying error messages
} from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import axios from "axios";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [squares1to6, setSquares1to6] = useState("");
  const [squares7and8, setSquares7and8] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:3001";

  const onSubmit = async () => {
    try {
      setLoading(true);

      // Continue with the password reset request
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("secret");

      await axios.post(`${apiUrl}/auth/reset-password`, {
        token,
        newPassword,
      });

      // Reset form and show success message
      setNewPassword("");
      setConfirmPassword("");
      setError(null);
      alert("Password reset successful!");
      navigate("/");
    } catch (ex) {
      // Handle errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);

    return () => {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);

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
                        Create password
                      </CardTitle>
                      <p> Please create a new password for your account</p>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
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
                            placeholder="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
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
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

                        {error && (
                          <Alert color="danger" className="mt-3">
                            {error}
                          </Alert>
                        )}
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
                        {loading ? "Submitting..." : "Submit"}
                      </Button>
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
