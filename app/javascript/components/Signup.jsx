import React from "react";
import { Link } from "react-router-dom";


class Signup extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    first_name: "",
	    last_name: "",
	    email: "",
	    password: "",
	    password_confirmation: ""
	};

	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
	this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
	event.preventDefault();
	const url = "/users/create";

	// protect against CSRF attacks
	const token = document.querySelector('meta[name="csrf-token"]').content;
	fetch(url, {
	    method: "POST",
	    headers: {
		"X-CSRF-Token": token,
		"Content-Type": "application/json"
	    },
	    body: JSON.stringify(this.state)
	}).then(
	    response => {
		if (response.ok) {
		    return response.json();
		}
		throw new Error("Network response was not ok.");
	    }
	).then(
	    response => this.props.history.push('/')
	).catch(
	    error => console.log(error.message)
	);
    }

    render() {
	return (
	    <div className="container mt-5">
	      <div className="row">
		<div className="col-sm-12 col-lg-6 offset-lg-3">
		  <h1 className="mb-5">
		    Join 1337PACK
		  </h1>
		  <form onSubmit={this.onSubmit}>
		    <div className="form-group">
		      <label for="inputEmail">Email Address</label>
		      <input type="email"
			     name="email"
			     className="form-control"
			     id="inputEmail"
			     required
			     onChange={this.onChange}/>
		    </div>
		    <div className="form-group">
		      <label for="inputPassword">Password</label>
		      <input type="password"
			     name="password"
			     className="form-control"
			     id="inputPassword"
			     required
			     onChange={this.onChange}/>
		    </div>
		    <div className="form-group">
		      <label for="inputPasswordConfirmation">Confirm Password</label>
		      <input type="password"
			     name="password_confirmation"
			     className="form-control"
			     id="inputPasswordConfirmation"
			     required
			     onChange={this.onChange}/>
		      <small id="passwordHelp" className="form-text text-muted">
			Minimum password length: 6 characters.
		      </small>
		    </div>
		    <div className="form-group">
		      <label for="inputFirstName">First Name</label>
		      <input type="text"
			     name="first_name"
			     className="form-control"
			     id="inputFirstName"
			     required
			     onChange={this.onChange}/>
		    </div>
		    <div className="form-group">
		      <label for="inputLastName">Last Name</label>
		      <input type="text"
			     name="last_name"
			     className="form-control"
			     id="inputLastName"
			     required
			     onChange={this.onChange}/>
		    </div>
		    <button type="submit" className="btn btn-dark mt-3">
		      Sign Me Up
		    </button>
		    <Link to="/" className="btn btn-link mt-3">
		      Cancel
		    </Link>
		  </form>
		</div>
	      </div>
	    </div>
	);
    }
}


export default Signup;
