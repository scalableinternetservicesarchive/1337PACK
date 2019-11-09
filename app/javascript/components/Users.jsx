import React from "react";
import { Link } from "react-router-dom";

class Users extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    users: []
	};
    }

    componentDidMount() {
	const url = "/users/index";
	fetch(url).then(
	    response => {
		if (response.ok) {
		    return response.json();
		}
		throw new Error("Network response was not ok.");
	    }
	).then(
	    response => this.setState({ users: response })
	).catch(
	    () => this.props.history.push("/")
	);
    }

    render() {
	const { users } = this.state;
	const allUsers = users.map((user, index) => (
	    <div key={index} className="col-md-6 col-lg-4">
	      <div className="card mb-4">
		<div className="card-body">
		  <h5 className="card-title">{user.first_name} {user.last_name}</h5>
		    View User
		</div>
	      </div>
	    </div>
	));
	const noUser = (
	    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
              <h4>
		No users yet. Register now!
              </h4>
	    </div>
	);

	return (
	    <div className="container py-5">
	      {users.length > 0 ? allUsers : noUser}
	    </div>
	);
    }
}

export default Users;
