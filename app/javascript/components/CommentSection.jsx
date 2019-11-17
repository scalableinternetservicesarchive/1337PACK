import React from "react";                                                  
import useForm from "react-hook-form";
import Cookies from "universal-cookie";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
    main: {
	marginTop: theme.spacing(4),
    },
    form: {
        width: '90%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Comments({ comments }) {
    return (
	<>
	  {comments.map( comment => (
	      <Grid item xs>
		{comment.content}
	      </Grid>
	  ))}
	</>
    );
}

export default function CommentSection({ event_id }) {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const [comments, setComments] = React.useState([]);
    
    React.useEffect(() => {
	const url = `/comments?event_id=${event_id}`;
	
        fetch(url).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            }
        ).then(
            response => setComments(response)
        ).catch(
            error => console.log(error.message)
        );
    });
    
    const onSubmit = data => {
	const url = "/comments";
	const token = document.querySelector('meta[name="csrf-token"]').content;
	const props = {
	    event_id: event_id,
	    parent_id: null,
	    user_id: cookies.get("UID"),
	};
	
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...data, ...props})
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            }
        ).catch(
            error => console.log(error.message)
        );

    };
    
    return (
	<Grid container className={classes.main}
	      justify="center" alignItems="center">
	  <Grid item xs={12}>
	  {comments.length === 0 ? (
	      <Typography variant="body1">
		No comments
	      </Typography>
	  ) : (
	      <Comments comments={comments}/>
	  )}
	</Grid>
	    <Grid item xs={12}>
	    <form className={classes.form}                                           
        noValidate                                                         
        onSubmit={handleSubmit(onSubmit)}>
	    <TextField variant="outlined" margin="normal"
        id="name" name="name"
	label="Name"
	defaultValue={cookies.get("FullName")}
        autoFocus
        inputRef={register({ required: true })}/>
	    <TextField variant="outlined" margin="normal"
        id="description" name="description"
        multiline
        fullWidth
        autoFocus
        inputRef={register({ required: true })}/>
	    <Button type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}>
            Add Comment
        </Button>
	    </form>
	    </Grid>
	</Grid>
    );
};
