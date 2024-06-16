import React from "react";

import "./timepage.styles.css";
import { Col, Row } from "antd";
import LayoutTop from "../../components/layout/layouttop";

const TimePage = () => (
  <Row>
    <Col span={24}>
      <LayoutTop />
      <h1>TimePage</h1>
    </Col>
  </Row>
);

export default TimePage;
