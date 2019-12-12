import React from "react";
import Cookies from "universal-cookie";
import useForm from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2)
  }
}));

function ProfileEdit({ user }) {
  const classes = useStyles();
  const [thisUser, setThisUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, errors } = useForm();

  React.useEffect(() => {
    setThisUser(user);
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = data => {
    const merged_data = {
      ...thisUser,
      ...data
    };
    const url = `/api/users/${thisUser.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("JWT")
      },
      body: JSON.stringify(merged_data)
    })
      .then(response => {
        if (response.ok) {
          setOpen(false);
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  };

  return (
    <div>
      <Button color="primary" size="small" onClick={handleClickOpen}>
        Edit Profile
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <div className={classes.paper}>
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
                    defaultValue={thisUser && thisUser.first_name}
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
                    defaultValue={thisUser && thisUser.last_name}
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
                    defaultValue={thisUser && thisUser.email}
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
              </Grid>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
                className={classes.submit}
              >
                Confirm
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProfileEdit;
