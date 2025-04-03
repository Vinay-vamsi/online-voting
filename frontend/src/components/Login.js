import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
    const [rollNumber, setRollNumber] = useState("");  // ✅ Correct variable
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {  // ✅ Ensure function is defined before use
        if (!rollNumber.trim()) {
            setError("Please enter your ID");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/login", { rollNumber });

            if (response.data.success) {
                localStorage.setItem("rollNumber", rollNumber);
                navigate("/dashboard");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h1>RAMACHANDRA COLLEGE OF ENGINEERING <span>ECE ELECTIONS</span></h1>
            <h2>Login Here</h2>
            <div className="input-field">
                <img src="https://img.icons8.com/?size=100&id=9ZgJRZwEc5Yj&format=png&color=000000" alt="User Icon" />
                <input
                    type="text"
                    id="rollNumber"
                    className="login-input"
                    placeholder="Enter Your ID..."
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <p>Note - Keep letters in uppercase</p>
            <button className="login-button" onClick={handleLogin}>Next</button> {/* ✅ Function is correctly used */}
        </div>
    );
};

export default Login;
