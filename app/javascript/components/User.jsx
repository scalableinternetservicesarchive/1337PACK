import React from "react";
import { Link } from "react-router-dom";

class User extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    user: {
		first_name: "",
		last_name: "",
		email: ""
	    }
	};
    }

    componentDidMount() {
	const {
	    match: {
		params: { id }
	    }
	} = this.props;

	const url = `/users/show/${id}`;

	fetch(url).then(
	    response => {
		if (response.ok) {
		    return response.json();
		}
		throw new Error("Network response was not ok.");
	    }
	).then(
	    response => this.setState({ user: response })
	).catch(
	    () => this.props.history.push("/users")
	);
    }

    render() {
	const { user } = this.state;
	return (
	    <div>
	      <h1 className="display-4">
		{user.first_name} {user.last_name}
	      </h1>
	      <p>Email: {user.email}</p>
	    </div>
	);
    }
}

export default User;
