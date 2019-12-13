import React from "react";
import Cookies from "universal-cookie";
import useForm from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  appBar: {
    position: "relative"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultValues = {
  start_time: new Date()
};

function EventEdit({ event }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, errors, getValues, setValue } = useForm({
    defaultValues
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = data => {
    const url = `/api/events/${event.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
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

  const handleDateChange = date => {
    setValue("start_time", date);
  };

  React.useEffect(() => {
    register({ name: "start_time", type: "datetime-local" });
  });

  return (
    <div>
      <Button color="primary" size="small" onClick={handleClickOpen}>
        Edit
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Update event
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                name="title"
                label="Event Title"
                autoFocus
                defaultValue={event && event.title}
                inputRef={register({ required: true })}
              />
              {errors.title && "Title is required."}

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="host_name"
                name="host_name"
                label="Hosted By"
                autoFocus
                defaultValue={event && event.host_name}
                inputRef={register({ required: true })}
              />
              {errors.host_name && "Host name is required."}

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  id="start_time"
                  name="start_time"
                  label="Event Date & Time"
                  inputVariant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={event && event.start_time}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="location_name"
                name="location_name"
                label="Location"
                autoFocus
                defaultValue={event && event.location_name}
                inputRef={register}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="street_address"
                name="street_address"
                label="Street Address"
                autoFocus
                defaultValue={event && event.street_address}
                inputRef={register}
              />

              <TextField
                variant="outlined"
                margin="normal"
                id="description"
                name="description"
                label="Event Description"
                multiline
                fullWidth
                autoFocus
                defaultValue={event && event.description}
                inputRef={register}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Confirm
              </Button>
            </form>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}

export default EventEdit;
