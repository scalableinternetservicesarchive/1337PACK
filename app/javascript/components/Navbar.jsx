import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'

const cookies = new Cookies();

class Navbar extends React.Component {
    constructor(props) {
	super(props);
        this.state = {
	    loggedin: false,
	    fullname: '',
        };
	this.logout = this.logout.bind(this);
    }
    
    componentWillMount() {
	if (cookies.get('JWT') !== null && cookies.get('JWT') !== undefined) {
	    this.setState({
		loggedin: true,
		fullname: cookies.get('FullName'),
	    });
	}
    }

    logout() {
	cookies.remove('JWT');
	cookies.remove('FullName');
	this.setState({ loggedin: false, fullname: '' });
    }
    
    render() {
	return (
	    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
	      <a className="navbar-brand" href="#">1337PACK</a>
	      <button className="navbar-toggler"
		      type="button"
		      data-toggle="collapse"
		      data-target=".dual-collapse2"
		      aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
	      </button>
	      <div className="collapse navbar-collapse dual-collapse2">
		<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
		  <li className="nav-item">
		    <Link className="nav-link" to="/">Home</Link>
		  </li>
		  <li className="nav-item">
		    <Link className="nav-link" to="/users">Users</Link>
		  </li>
		  <li className="nav-item">
		    <Link className="nav-link" to="/events">Events</Link>
		  </li>
		</ul>
	      </div>
	      <div className="collapse navbar-collapse dual-collapse2">
		<div className={this.state.loggedin ? 'd-none' : ''}>
		  <ul className="navbar-nav ml-auto">
		    <li className="nav-item">
		      <Link className="nav-link" to="/signup">Sign Up</Link>
		    </li>
		    <li className="nav-item">
		      <Link className="nav-link" to="/login">Log In</Link>
		    </li>
		  </ul>
		</div>
		<div className={this.state.loggedin ? '' : 'd-none'}>
		  <ul className="navbar-nav ml-auto">
		    <li className="nav-item">
		      <span className="navbar-text">{this.state.fullname}</span>
		    </li>
		    <li className="nav-item">
		      <Link className="nav-link" onClick={this.logout} to="/">Log Out</Link>
		    </li>
		  </ul>
		</div>
	      </div>
	    </nav>
	);
    }
}

export default Navbar;
