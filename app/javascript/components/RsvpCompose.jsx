import React from "react";
import Cookies from "universal-cookie";
import useForm from "react-hook-form";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Snackbar from "@material-ui/core/Snackbar";

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

function RsvpCompose(props) {
  const classes = useStyles();
  const [guestName, setGuestName] = React.useState("");
  const [guestId, setGuestId] = React.useState(null);
  const [value, setValue] = React.useState("yes");
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  React.useEffect(() => {
    setGuestId(cookies.get("UID"));
    setGuestName(cookies.get("FullName"));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRadioChange = event => {
    setValue(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = () => {
    const data = {
      user_id: guestId,
      event_id: props.event_id,
      guest_name: guestName,
      response: value
    };
    const url = `/api/events/${props.event_id}/rsvps`;
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
          setOpen(false);
          setSnackbarOpen(true);
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
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
        RSVP
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>RSVP</DialogTitle>
        <DialogContent>
          <DialogContentText>Respond as {guestName}</DialogContentText>
          <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Response</FormLabel>
                    <RadioGroup
                      name="response"
                      value={value}
                      onChange={handleRadioChange}
                      row
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="maybe"
                        control={<Radio color="primary" />}
                        label="Maybe"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label="No"
                        labelPlacement="bottom"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Post
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

export default withRouter(RsvpCompose);
