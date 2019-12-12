import React from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import Navbar from "./Navbar";
import EventGrid from "./EventGrid";

const useStyles = makeStyles(theme => ({
  main: {
    marginLeft: theme.spacing(7) + 1
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

function getNextPage(currentLength) {
  return Math.ceil(currentLength / 10) + 1;
}

export default function Events() {
  const classes = useStyles();
  const [events, setEvents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [exhausted, setExhausted] = React.useState(false);

  function handleScroll() {
    if (
      exhausted ||
      window.innerHeight + document.documentElement.scrollTop <=
        document.documentElement.offsetHeight
    ) {
      return;
    }
    setIsLoading(true);
  }

  function fetchMoreEvents(currentLength) {
    const page = getNextPage(currentLength);
    const url = `/api/events/?offset=${page}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setEvents([...events, ...response]);
        setIsLoading(false);
        if (response.length === 0) setExhausted(true);
      })
      .catch(error => console.log(error.message));
  }

  React.useEffect(() => {
    if (!isLoading) return;
    fetchMoreEvents(events.length);
  }, [isLoading]);

  React.useEffect(() => {
    fetchMoreEvents(0);
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container component="main" className={classes.main}>
        <EventGrid events={events} editable={false} />
        {isLoading && !exhausted && <CircularProgress />}
      </Container>
    </div>
  );
}
