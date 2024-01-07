import React from "react";
import { Col, Row, Card } from "antd";

import "./home.styles.css";
import MainForm from "../Form/main form/mainForm.component";
import TableMain from "../Table/Table Main/tableMain.component";
import SearchForm from "../Form/search form/searchForm.component";

const Home = () => {
  return (
    <>
      <Row>
        <Col
          className="m-0 flex items-center justify-between p-6 bg-sky-900"
          span={12}
          offset={0}
        >
          <Card
            style={{
              width: 700,
            }}
          >
            <MainForm />
          </Card>
          <Card
            style={{
              width: 300,
            }}
          >
            <SearchForm />
          </Card>
        </Col>
        <Col span={12} offset={0}></Col>
        <Col span={24}>
          <TableMain />
        </Col>
      </Row>
    </>
  );
};

export default Home;
