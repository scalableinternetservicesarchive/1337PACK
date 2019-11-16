import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import Moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './Navbar';

const cookies = new Cookies();


const useStyles = makeStyles(theme => ({
    paper: {
	marginTop: theme.spacing(8),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
    },
    avatar: {
	margin: theme.spacing(1),
	backgroundColor: theme.palette.secondary.main,
	sizes: 200,
    },
    card: {
	maxWidth: 500,
	minWidth: 300,
	marginBottom: theme.spacing(4),
    },
    eventCard: {
	maxWidth: 600,
	minWidth: 400,
	maxHeight: 400,	
    },
    section1: {
	margin: theme.spacing(3, 2),
    },
    section2: {
	margin: theme.spacing(2),
    },
    section3: {
	margin: theme.spacing(3, 1, 1),
    },
}));


function getInitials(user) {
    if (user != null) {
	return user.first_name.charAt(0).toUpperCase() +
	    user.last_name.charAt(0).toUpperCase();
    } else {
	return '';
    }
}

function formatDateTime(dt) {
    return Moment(dt).format("MMM Do YYYY h:mm a");
}

function getEmail(user) {
    return user === null ? '' : user.email;
}

function getFullName(user) {
    if (user != null) {
	return user.first_name + ' ' + user.last_name;
    } else {
	return '';
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
	setCurrentUser(cookies.get('UID'));
    }, [cookies]);
    
    React.useEffect(() => {
	const url = `/users/show/${id}`;
	fetch(url).then(
	    response => {
		if (response.ok) {
		    return response.json();
		}
		throw new Error("Network response was not ok.");
	    }
	).then(
	    response => setUser(response)
	).catch(
	    error => console.log(error.message)
	);

	const url1 = `/events/index?user_id=${id}`;
	fetch(url1).then(
	    response => {
		if (response.ok) {
		    return response.json();
		}
		throw new Error("Network response was not ok.");
	    }
	).then(
	    response => setEvents(response)
	).catch(
	    error => console.log(error.message)
	);
    }, []);

    return (
	<div>
	  <CssBaseline />
	  <Navbar />
	  <Container component="main" maxWidth="xs">
	    <div className={classes.paper}>
	      <Grid container justify="center" spacing={2}>
		<Grid item xs={12}>
		  <Card className={classes.card}>
		    <CardContent>
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
		      {currentUser === id && (
			  <Button size="small" color="primary">
			    Edit profile
			  </Button>
		      )}
	</CardActions>
	    </Card>
	    </Grid>
	    <Grid item xs={12}>
	    <Typography component="h1" variant="h3">
	    All events
	</Typography>
	    </Grid>
	    {events.map(event => (
		<Grid item xs={12} key={event.id}>
		  <Card className={classes.eventCard}>
		    <CardContent>
		      <div className={classes.section1}>
			<Typography variant="h5">
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
		      <div className={classes.section3}>
			<Button color="primary">Learn more</Button>
		      </div>
		    </CardContent>
		  </Card>
		</Grid>
	    ))}
	    </Grid>
	    </div>
	  </Container>
	</div>
    );
};


