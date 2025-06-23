import React, { useState } from "react";
import './Auth.css';

function Auth({ onLogin }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, just mock login
        if (formData.email && formData.password) {
            localStorage.setItem('user', JSON.stringify(formData));
            onLogin();
        } else {
            alert("Please fill all fields");
        }
    };

    return (
        <div className="auth-container">
            <h2>{isSignUp ? "Create an Account" : "Sign In"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>
            <p onClick={() => setIsSignUp(!isSignUp)} className="auth-toggle">
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </p>
        </div>
    );
}

export default Auth;
