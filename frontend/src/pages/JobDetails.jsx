import "./JobDetails.css";
import { useNavigate } from "react-router-dom";
function JobDetails() {
  const navigate = useNavigate();
  return (
    <div className="job-container">
      <div className="job-card">
        <h1>Software Developer</h1>
        <p><strong>Company:</strong> TCS</p>
        <p><strong>Location:</strong> Bangalore</p>
        <p><strong>Salary:</strong> ₹12 LPA</p>

        <h3>Requirements</h3>
        <ul>
          <li>React.js</li>
          <li>JavaScript</li>
          <li>HTML & CSS</li>
          <li>Git & GitHub</li>
        </ul>

        <button onClick={() => navigate("/admin")}>Apply Now</button>
      </div>
    </div>
  );
}

export default JobDetails;