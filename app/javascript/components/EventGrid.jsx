import React from "react";

import { Link } from "react-router-dom";
import Moment from "moment";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import EventEdit from "./EventEdit";

const useStyles = makeStyles(theme => ({
  eventGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    flexGrow: 1
  },
  section1: {
    margin: theme.spacing(3, 2)
  },

  section2: {
    margin: theme.spacing(2)
  },
  section3: {
    margin: theme.spacing(3, 1, 1)
  }
}));

function formatDateTime(dt) {
  return Moment(dt).format("MMM Do YYYY h:mm a");
}

export default function EventGrid({ events, editable }) {
  const classes = useStyles();
  const [showEdit, setShowEdit] = React.useState(false);

  React.useEffect(() => {
    setShowEdit(editable);
  }, [editable]);

  return (
    <Container className={classes.eventGrid} maxWidth="md">
      <Grid container spacing={4}>
        {events.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div className={classes.section1}>
                  <Typography gutterBottom variant="h5">
                    {event.title}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {formatDateTime(event.start_time)}
                  </Typography>
                </div>
                <Divider variant="middle" />
                <div className={classes.section2}>
                  <Typography variant="body2" component="p">
                    {event.description}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Link to={`/event/${event.id}`}>
                  <Button color="primary" size="small">
                    Learn more
                  </Button>
                </Link>
                {showEdit && <EventEdit event={event}/>}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
