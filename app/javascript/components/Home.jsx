import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">1337PACK</h1>
        <p className="lead">
          Create and share your event.
        </p>
        <hr className="my-4" />
        <Link
          to="/events"
          className="btn btn-lg btn-dark"
          role="button"
        >
          View Events
        </Link>
      </div>
    </div>
  </div>
);
