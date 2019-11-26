import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Navbar from "./Navbar";
import EventCompose from "./EventCompose";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    margin: theme.spacing(3)
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h2">
            1337PACK
          </Typography>
          <Typography component="h2" variant="h5">
            Create and share your events.
          </Typography>
          <Divider variant="middle" />
          <Link className={classes.button} to="/events">
            <Button variant="contained" color="primary">
              Browse Events
            </Button>
          </Link>
          <EventCompose />
        </div>
      </Container>
    </div>
  );
}
