import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginData, setLoginData] = useState({
        adhar_no: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/userpage'); // Redirect to user page on successful login
            } else {
                alert(data.message || 'Login failed');
                navigate('/signin'); // Redirect to signup page if login fails
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="adhar_no"
                    placeholder="Aadhaar Number"
                    value={loginData.adhar_no}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;