import React from "react";
import useForm from "react-hook-form";
import Cookies from "universal-cookie";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CommentList from "./CommentList";

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(4)
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function fetchComments(event_id, setComments) {
  const url = `/api/events/${event_id}/comments`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => {
      setComments(response);
      return response;
    })
    .catch(error => console.log(error.message));
}

function addComment(data, event_id, comments, setComments) {
  const url = `/api/events/${event_id}/comments`;
  const token = document.querySelector('meta[name="csrf-token"]').content;
  const merged_data = { ...data, user_id: cookies.get("UID") };

  fetch(url, {
    method: "POST",
    headers: {
      "X-CSRF-Token": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(merged_data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => setComments([...comments, response]))
    .catch(error => console.log(error.message));
}

function CommentSection({ event_id, updateCount }) {
  const classes = useStyles();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    fetchComments(event_id, setComments);
  }, []);

  React.useEffect(() => {
    updateCount(comments.length);
  }, [comments]);

  const onSubmit = data => {
    addComment(data, event_id, comments, setComments);
    setValue("content", "");
  };

  return (
    <Grid
      container
      className={classes.main}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        {comments.length === 0 ? (
          <Typography variant="body1">No comments</Typography>
        ) : (
          <CommentList comments={comments} />
        )}
      </Grid>
      <Grid item xs={12}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            id="user_name"
            name="user_name"
            label="Name"
            defaultValue={cookies.get("FullName")}
            autoFocus
            inputRef={register({ required: true })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="content"
            name="content"
            multiline
            fullWidth
            autoFocus
            inputRef={register({ required: true })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Comment
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default CommentSection;
