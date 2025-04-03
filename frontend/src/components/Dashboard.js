import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-card">
            <h2>DASHBOARD</h2>
            <div className="vote">
                <p>"click here to vote"</p>
                <button onClick={() => navigate("/voting")}>Vote</button>
            </div>
            <div className="result">
                <p>Note - Only admin can access the results</p>
                <button onClick={() => navigate("/results")}>Results</button>  
            </div>
        </div>
    );
};

export default Dashboard;


