import React from "react";
import { Button, Col, Row } from "antd";

import "./login.styles.scss";
import { EMPTY_CATTS, EMPTY_TAGS, LOGIN } from "../../../redux/user_redux/userAction";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(EMPTY_TAGS());
    dispatch(EMPTY_CATTS());
  };

  return (
    // background image for login page
    <Row className="login_bg" justify="space-around" align="middle" style={{}}>
      {/* center div for login form & logo */}
      <Col className="login_bg_container">
        <Button
          htmlType="submit"
          className="btn_next"
          style={{ width: "100%", marginLeft: "0" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
