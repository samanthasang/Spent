import { Col, Row } from "antd";
import React from "react";

import Login from "../../components/login-items/login/login.component";

import "./loginpage.styles.scss";

// main login component
const LoginPage = () => (
  <Row>
    {/* full wide div */}
    <Col span={24}>
      {/* render the login container component */}
      <Login />
    </Col>
  </Row>
);

export default LoginPage;
