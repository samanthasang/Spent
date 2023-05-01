import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./home.styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import ourPartners from "../../assets/Our Partners.png";
import LogoComponent from "../global/logo.component";

const Home = () => {
  const wallet = useSelector((state) => state.user.walletAddress);
  let navigate = useNavigate();
  return (
    <>
      <Grid
        container
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item md={3} xs={10}>
          <Card
            sx={{ minWidth: 275 }}
            className="container_xs"
            style={{
              background: "rgba(158, 145, 180, 0.25)",
              backdropFilter: "blur(7.5px)",
              borderRadius: "20px",
              padding: "7%",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 46 }}
                color="#fff"
                lineHeight={1.2}
                fontWeight={700}
              >
                Welcome to
              </Typography>
              <Typography
                sx={{ fontSize: 46 }}
                color="#fff"
                gutterBottom
                lineHeight={1.2}
                paddingBottom="10%"
                fontWeight={700}
              >
                IP Minter
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontSize: 16 }}
                color="#D6D6D6"
                paddingBottom="10%"
                fontWeight={700}
              >
                Mint your Intellectual Property (IP) to a worldwide chain in our
                platform freely. We help you to keep your IP safe forever, list
                and manage them easily, and even transfer the ownership of you
                minted IP in a blink of an eye.
              </Typography>
            </CardContent>
            <CardActions
              md={8}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              Spacing={2}
            >
              <Button
                minWidth="75%"
                variant="contained"
                fontWeight={700}
                style={{
                  width: "75%",
                  fontWeight: "700",
                }}
                onClick={() =>
                  !wallet ? navigate("/wallet") : navigate("/mint")
                }
              >
                Mint Your IP
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <div
        className="our-partner-controller"
        style={{
          position: "absolute",
          bottom: "20px",
          left: "15px",
        }}
      >
        <img src={ourPartners} alt="our Partners" />
      </div>
    </>
  );
};

export default Home;
