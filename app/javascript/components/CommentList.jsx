import React from "react";
import Moment from "moment";

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    comment: {
	marginBottom: theme.spacing(4),
	backgroundColor: theme.palette.background.paper,
    }
}));

function formatDateTime(dt) {
    return Moment(dt).fromNow();
}

function getAvatar(user_name, className) {
    if (user_name != null) {
	const initial = user_name.charAt(0).toUpperCase();
	return (
	    <Avatar className={className}>
	      {initial}
	    </Avatar>
	);
    } else {
	return <></>;
    };
    
}

function Comment({ comment }) {
    const classes = useStyles();
    
    return (
	<Grid container className={classes.comment}
	      alignItems="center" justify="center">
	  <Grid item xs={1}>
	    {getAvatar(comment.user_name, classes.avatar)}
	  </Grid>
	  <Grid item xs={9} container>
	    <Grid item xs={12} container>
	      <Grid item xs={8}>
		<Typography gutterBottom variant="subtitle1">
		  {comment.user_name}
		</Typography>
	      </Grid>
	      <Grid item xs={4}>
		<Typography gutterBottom variant="body2" color="textSecondary">
		  {formatDateTime(comment.created_at)}
		</Typography>
	      </Grid>
	    </Grid>
	    <Grid item xs={12}>
	      <Typography gutterBottom variant="body1">
		{comment.content}
	      </Typography>
	    </Grid>
	  </Grid>
	</Grid>
    );
}

function CommentList({ comments }) {
    const classes = useStyles();
    return (
        <>
          {comments.map( comment => (
              <Comment key={comment.id} comment={comment} className={classes.comment}/>
          ))}
        </>
    );
}
 
export default CommentList;
