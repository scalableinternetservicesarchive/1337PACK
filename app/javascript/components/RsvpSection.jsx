import React from "react";
import Cookies from "universal-cookie";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import RsvpList from "./RsvpList";

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(4)
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function fetchRsvps(event_id, setRsvps) {
  const url = `/api/events/${event_id}/rsvps`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => {
      setRsvps(response);
      return response;
    })
    .catch(error => console.log(error.message));
}

function RsvpSection({ event_id }) {
  const classes = useStyles();
  const [rsvps, setRsvps] = React.useState([]);

  React.useEffect(() => {
    fetchRsvps(event_id, setRsvps);
  }, []);

  return (
    <Grid
      container
      className={classes.main}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        {rsvps.length === 0 ? (
          <Typography variant="body1">No rsvps</Typography>
        ) : (
          <RsvpList rsvps={rsvps} />
        )}
      </Grid>
    </Grid>
  );
}

export default RsvpSection;
