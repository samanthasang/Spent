import React from "react";

import "./callenderpage.styles.css";
import Home from "../../components/home/home.component";
import { Col, Row } from "antd";
import LayoutTop from "../../components/layout/layouttop";

const CallenderPage = () => (
  <Row>
    <Col span={24}>
      <LayoutTop />
      <h1>CallenderPage</h1>
    </Col>
  </Row>
);

export default CallenderPage;
