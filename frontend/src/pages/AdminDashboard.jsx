import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>Admin Dashboard</h1>
        <div className="card">
          <h3>Total Users</h3>
          <p>250</p>
        </div>
        <div className="card">
          <h3>Total Jobs</h3>
          <p>40</p>
        </div>
        <div className="card">
          <h3>Applications</h3>
          <p>125</p>
        </div>
        <button onClick={() => navigate("/")}>Add Job</button>
      </div>
    </div>
  );
}
export default AdminDashboard;