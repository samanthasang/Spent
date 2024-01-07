import React from "react";

import "./homepage.styles.css";
import Home from "../../components/home/home.component";
import { Col, Row } from "antd";
import LayoutTop from "../../components/layout/layouttop";

const HomePage = () => (
  <Row>
    <Col  span={24}>
      <LayoutTop />
      <Home />
    </Col>
  </Row>
);

export default HomePage;
