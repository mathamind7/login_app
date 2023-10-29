import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/login', { email, password });
            console.log(response.data);
            navigate("/dashboard");
        } catch (error) {
            console.error(error.response.data);
        }
    }

    return (
        <div className="card">
            <form className="main" method="POST" action="submit" onSubmit={handleSubmit}>
                <div className="heading">
                    <h1>LOGIN</h1>
                </div>
                <label htmlFor="email">
                    <div className="body1">
                        <h2>Email:</h2>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Type Email"
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </label>
                <label htmlFor="password">
                    <div className="body2">
                        <h2>Password:</h2>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Type Password"
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </label>
                <div className="submit">
                    <button type="submit" value="Submit">Login</button>
                </div>
            </form>
            <div>
                <p>Don't have an account?<Link to="/registration">Sign up</Link></p>
            </div>
        </div>
    );
}

export default Login;
