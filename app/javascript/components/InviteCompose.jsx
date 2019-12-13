import React from "react";
import Cookies from "universal-cookie";
import useForm from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

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

function fetchUsers(setUsers) {
  const url = "/api/users";

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => {
      setUsers(response);
    })
    .catch(error => console.log(error.message));
}

function sendInvite(user, event_id, message) {
  const url = `/api/events/${event_id}/invites`;
  const token = document.querySelector('meta[name="csrf-token"]').content;
  const data = {
    event_id: event_id,
    user_id: user.id,
    message: message
  };
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
    .catch(error => console.log(error.message));
}

function InviteCompose(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [selections, setSelections] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  React.useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (event, value) => {
    setSelections(value);
  };

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  const onSubmit = () => {
    selections.map(user => sendInvite(user, props.event_id, message));
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Success!"
      />
      <Button color="primary" size="small" onClick={handleClickOpen}>
        Invite
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invite</DialogTitle>
        <DialogContent>
          <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    multiline
                    label="Message"
                    fullWidth
                    margin="normal"
                    onChange={handleMessageChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={users}
                    getOptionLabel={option => option.email}
                    onChange={handleChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Send Invites to"
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Send
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InviteCompose;
