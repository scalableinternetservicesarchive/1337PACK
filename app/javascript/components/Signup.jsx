import React from "react";
import useForm from "react-hook-form";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Navbar from "./Navbar";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

function Signup(props) {
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = data => {
    const url = "/api/users";

    // protect against CSRF attacks
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => props.history.push("/"))
      .catch(error => console.log(error.message));
  };

  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  autoComplete="fname"
                  name="first_name"
                  id="first_name"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                  inputRef={register({
                    required: "First name required",
                    maxLength: {
                      value: 25,
                      message: "Maximum length 25"
                    }
                  })}
                />
                {errors.first_name && errors.first_name.message}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  autoComplete="lname"
                  name="last_name"
                  id="last_name"
                  required
                  fullWidth
                  label="Last Name"
                  autoFocus
                  inputRef={register({
                    required: "Last name required",
                    maxLength: {
                      value: 25,
                      message: "Maximum length 25"
                    }
                  })}
                />
                {errors.last_name && errors.last_name.message}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  inputRef={register({
                    required: "Email required",
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "Invalid email"
                    }
                  })}
                />
                {errors.email && errors.email.message}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  inputRef={register({
                    required: "Password required",
                    minLength: {
                      value: 6,
                      message: "Minimum length 6"
                    }
                  })}
                />
                {errors.password && errors.password.message}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password_confirmation"
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  inputRef={register({
                    validate: val => val === watch("password")
                  })}
                />
                {errors.password_confirmation && "Password mismatch"}
              </Grid>
            </Grid>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(Signup);
