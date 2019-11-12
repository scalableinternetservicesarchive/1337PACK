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
	    password_confirmation: "",
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

    componentDidMount() {
	window.addEventListener('load', function() {
	    var forms = document.getElementsByClassName('needs-validation');
	    var validation = Array.prototype.filter.call(forms, function(form) {
		form.addEventListener('submit', function(event) {
		    if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		    }
		    form.classList.add('was-validated');
		}, false);
	    });
	}, false);
    }
    
    render() {
	return (
	    <div className="container mt-5">
	      <div className="row">
		<div className="col-sm-12 col-lg-6 offset-lg-3">
		  <h1 className="mb-5">
		    Join 1337PACK
		  </h1>
		  <form className="needs-validation" noValidate onSubmit={this.onSubmit}>
		    <div className="form-group">
		      <label htmlFor="inputEmail">Email Address</label>
		      <input type="email"
			     name="email"
			     className="form-control"
			     id="inputEmail"
			     required
			     onChange={this.onChange}/>
		      <div className="invalid-feedback">
			Invalid email
		      </div>
		    </div>
		    <div className="form-group">
		      <label htmlFor="inputPassword">Password</label>
		      <input type="password"
			     name="password"
			     className="form-control"
			     id="inputPassword"
			     required minLength="6"
			     aria-describedby="passwordHelp"
			     onChange={this.onChange}/>
		      <div className="invalid-feedback">
			Password too short
		      </div>
		    </div>
		    <div className="form-group">
		      <label htmlFor="inputPasswordConfirmation">Confirm Password</label>
		      <input type="password"
			     name="password_confirmation"
			     className="form-control"
			     id="inputPasswordConfirmation"
			     required pattern={this.state.password}
			     onChange={this.onChange}/>
		      <div className="invalid-feedback">
			Password does not match
		      </div>
		      <small id="passwordHelp" className="form-text text-muted">
			Minimum password length: 6 characters.
		      </small>
		    </div>
		    <div className="form-group">
		      <label htmlFor="inputFirstName">First Name</label>
		      <input type="text"
			     name="first_name"
			     className="form-control"
			     id="inputFirstName"
			     required
			     onChange={this.onChange}/>
		      <div className="invalid-feedback">
			Required
		      </div>
		    </div>
		    <div className="form-group">
		      <label htmlFor="inputLastName">Last Name</label>
		      <input type="text"
			     name="last_name"
			     className="form-control"
			     id="inputLastName"
			     required
			     onChange={this.onChange}/>
		      <div className="invalid-feedback">
			Required
		      </div>
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
