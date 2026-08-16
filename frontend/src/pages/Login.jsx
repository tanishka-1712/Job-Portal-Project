import "./Login.css";
import { useNavigate } from "react-router-dom";
function Login(){
    const navigate = useNavigate();
    return(
        <div className="login-container">
            <div className="login-box">
            <h1>Job Portal</h1>
            <p>Login to your Account</p>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="password" />
            <button onClick={() => navigate("/jobs")}>Login</button>
            </div>
        </div>
    );
}
export default Login;
