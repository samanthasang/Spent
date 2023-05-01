import React from "react";

import "./homepage.styles.css";
import Home from "../../components/home/home.component";
import Frame1 from "../../assets/bg.png";
import { Grid } from "@mui/material";

const HomePage = () => (
  <Grid
    container
    className="login_bg register_container"
    justify="space-around"
    align="middle"
    style={{
      background: `url(${Frame1})`,
    }}
  >
    <Home />
  </Grid>
);

export default HomePage;
