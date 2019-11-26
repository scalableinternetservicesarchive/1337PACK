import React from "react";
import { Link } from "react-router-dom";

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './Navbar';
import EventGrid from './EventGrid';

const useStyles = makeStyles(theme => ({
    main: {
        marginLeft: theme.spacing(7) + 1,
    },
    paper: {
	marginTop: theme.spacing(8),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
    },
}));

export default function Events() {
    const classes = useStyles();
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
	const url = "/events/index";
	fetch(url).then(
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
	  <Container component="main" className={classes.main}>
	    <EventGrid events={events} editable={false}/>
	  </Container>
	</div>
    );
};
