import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    email: "",
	    password: "",
	};

	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
	this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
	event.preventDefault();
	const url = "/auth/login";
	
	// protect against CSRF attacks
	const token = document.querySelector('meta[name="csrf-token"]').content;
	fetch(url, {
	    method: "POST",
	    headers: {
		"X-CSRF-Token": token,
		"Content-Type": "application/json"
	    },
	    body: JSON.stringify({ user: this.state })
	}).then(
	    response => {
		if (response.ok) {
		    return response.json();
		}
		throw new Error("Network response was not ok.");
	    }
	).then(
	    response => {
		cookies.set('JWT', response.token, { path: '/' });
		cookies.set('FullName', response.first_name + ' ' + response.last_name, { path: '/' });
		this.props.history.push('/');
	    }
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
		    Login
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
		    </div>
		    <button type="submit" className="btn btn-dark mt-3">
		      Login
		    </button>
		  </form>
		</div>
	      </div>
	    </div>
	);
    }
}


export default Login;
