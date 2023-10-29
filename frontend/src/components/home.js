import React from "react";
import { Link } from "react-router-dom";

function Home(){
    return (
        <div className="center-div">
        <div>
          <h1>Welcome to the Home Page</h1>
          <button>
            <Link to="/login">Login</Link>
          </button>
          <button>
            <Link to="/registration">Signup</Link>
          </button>
          <button>
            <Link to="/admin">Admin</Link>
          </button>
          </div>
        </div>
      );
}

export default Home;