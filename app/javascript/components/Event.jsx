import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Moment from "moment";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";
import CommentSection from "./CommentSection";
import RsvpCompose from "./RsvpCompose";
import RsvpSection from "./RsvpSection";
import InviteCompose from "./InviteCompose";
import EventEdit from "./EventEdit";

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  main: {
    marginLeft: theme.spacing(7) + 1
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  badge: {
    padding: theme.spacing(0, 2)
  },
  panel: {
    //backgroundColor: theme.palette.common.white,
    padding: theme.spacing(4)
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
  },
  section1: {
    margin: theme.spacing(3, 2)
  },
  section2: {
    margin: theme.spacing(2)
  }
}));

function formatDateTime(dt) {
  return Moment(dt).format("MMM Do YYYY h:mm a");
}

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

function getFullName(user) {
  if (user != null) {
    return user.first_name + " " + user.last_name;
  } else {
    return "";
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
}

function Event(props) {
  const classes = useStyles();
  const {
    match: {
      params: { id }
    }
  } = props;
  const [event, setEvent] = React.useState(null);
  const [commentCount, setCommentCount] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(0);

  // TODO: this does not update render after cookies change
  React.useEffect(() => {
    setCurrentUser(cookies.get("UID"));
  }, [cookies]);

  React.useEffect(() => {
    const url = `/api/events/${id}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setEvent(response))
      .catch(error => console.log(error.message));
  }, []);

  const updateCommentCount = newCount => setCommentCount(newCount);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWidth="md" className={classes.main}>
        <div className={classes.paper}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={10}>
              {event != null && (
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <div className={classes.section1}>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography gutterBottom variant="h4">
                            {event.title}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography gutterBottom variant="h6">
                            {formatDateTime(event.start_time)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="body2" color="textSecondary">
                        {event.description}
                      </Typography>
                    </div>
                    <Divider variant="middle" />
                    <div className={classes.section2}>
                      <Typography variant="body1">
                        Host: {event.host_name}
                      </Typography>
                      <Typography variant="body1">
                        Location: {event.location_name}
                        <br />
                        {event.street_address}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    {!!currentUser && <RsvpCompose event_id={id} />}
                    {currentUser == event.user_id && (
                      <>
                        <InviteCompose event_id={id} />
                        <EventEdit event={event}/>
                      </>
                    )}
                  </CardActions>
                </Card>
              )}
            </Grid>
            <Grid item xs={10}>
              <Paper className={classes.panel}>
                <Tabs
                  value={tabValue}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleTabChange}
                  centered
                >
                  <Tab
                    label={
                      <Badge
                        color="secondary"
                        className={classes.badge}
                        badgeContent={commentCount}
                      >
                        Comments
                      </Badge>
                    }
                  />
                  <Tab label="RSVPs" />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                  <CommentSection
                    event_id={id}
                    updateCount={updateCommentCount}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <RsvpSection event_id={id} />
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(Event);
