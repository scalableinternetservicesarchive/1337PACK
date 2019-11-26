import React from "react";
import useForm from "react-hook-form";
import { Link, withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Navbar from './Navbar';


const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
    '@global': {
	body: {
	    backgroundColor: theme.palette.common.white,
	},
    },
    paper: {
	marginTop: theme.spacing(12),
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
    },
    avatar: {
	margin: theme.spacing(1),
	backgroundColor: theme.palette.secondary.main,
    },
    form: {
	width: '90%',
	marginTop: theme.spacing(3),
    },
    submit: {
	margin: theme.spacing(3, 0, 2),
    },
}));

function Login(props) {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
	const url = "/api/auth/login";
	// protect against CSRF attacks
	const token = document.querySelector('meta[name="csrf-token"]').content;
	fetch(url, {
	    method: "POST",
	    headers: {
		"X-CSRF-Token": token,
		"Content-Type": "application/json"
	    },
	    body: JSON.stringify(data)
	}).then(
	    response => {
		if (response.ok) {
		    return response.json();
		}
		throw new Error("Network response was not ok.");
	    }
	).then(
	    response => {
		cookies.set('JWT', response.token, { path: '/' });
		cookies.set('UID', response.uid, { path: '/' });
		cookies.set('FullName', response.first_name + ' ' + response.last_name, { path: '/' });
		props.history.push('/');
	    }
	).catch(
	    error => console.log(error.message)
	);

    };
    
    const classes = useStyles();
    
    return (
	<div>
	  <CssBaseline />
	  <Navbar/>
	  <Container component="main" maxWidth="xs">
	    <div className={classes.paper}>
	      <Avatar className={classes.avatar}>
		<LockOutlinedIcon />
	      </Avatar>
	      <Typography component="h1" variant="h5">
		Log in
	      </Typography> 
	      <form className={classes.form}
		    noValidate
		    onSubmit={handleSubmit(onSubmit)}>
		<TextField variant="outlined" margin="normal"
			   required fullWidth
			   id="email" name="email"
			   label="Email Address"
			   autoComplete="email"
			   autoFocus
			   inputRef={register({ required: true })}/>
		{errors.email && 'Email is required.'}
		<TextField variant="outlined" margin="normal"
			   required fullWidth
			   id="password" name="password"
			   label="Password"
			   type="password"
			   autoComplete="current-password"
			   inputRef={register}/>
		<Button type="submit"
			fullWidth
			variant="contained"
			color="primary"
			className={classes.submit}>
		  Log In
		</Button>
		<Grid container>
		  <Grid item xs>
		    <Link to="/signup" variant="body2">
		      {"Don't have an account? Sign up"}
		    </Link>
		  </Grid>
		</Grid>
	      </form>
	    </div>
	  </Container>
	</div>
    );
};

export default withRouter(Login);
