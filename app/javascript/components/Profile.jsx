import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";
import EventGrid from "./EventGrid";
import ProfileEdit from "./ProfileEdit";

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    sizes: 200
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(3, 2)
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(3, 2)
  }
}));

function getInitials(user) {
  if (user != null) {
    return (
      user.first_name.charAt(0).toUpperCase() +
      user.last_name.charAt(0).toUpperCase()
    );
  } else {
    return "";
  }
}

function getEmail(user) {
  return user === null ? "" : user.email;
}

function getFullName(user) {
  if (user != null) {
    return user.first_name + " " + user.last_name;
  } else {
    return "";
  }
}

export default function Profile(props) {
  const classes = useStyles();
  const {
    match: {
      params: { id }
    }
  } = props;
  const [user, setUser] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  // TODO: this does not update render after cookies change
  React.useEffect(() => {
    setCurrentUser(cookies.get("UID"));
  }, [cookies]);

  React.useEffect(() => {
    const url = `/api/users/${id}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setUser(response))
      .catch(error => console.log(error.message));

    const url1 = `/api/users/${id}/events`;
    fetch(url1)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setEvents(response))
      .catch(error => console.log(error.message));
  }, []);

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Avatar className={classes.avatar}>
                    {getInitials(user)}
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    {getFullName(user)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {getEmail(user)}
                  </Typography>
                </CardContent>
                <CardActions>
                  {currentUser === id && <ProfileEdit user={user} />}
                </CardActions>
              </Card>
            </Grid>
            <EventGrid events={events} editable={currentUser === id} />
          </Grid>
        </div>
      </Container>
    </div>
  );
}
