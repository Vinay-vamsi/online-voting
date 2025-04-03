import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import added
import axios from "axios";
import "../styles/Voting.css";

const Voting = () => {
    const [candidates, setCandidates] = useState([]);
    const [selectedHeadBoy, setSelectedHeadBoy] = useState("");
    const [selectedHeadGirl, setSelectedHeadGirl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/candidates").then((res) => setCandidates(res.data));
    }, []);

    const handleVote = async () => {
        const rollNumber = localStorage.getItem("rollNumber");

        try {
            await axios.post("http://localhost:5000/api/vote", {
                rollNumber,
                headBoyId: selectedHeadBoy,
                headGirlId: selectedHeadGirl
            });

            alert("Vote cast successfully!");
            navigate("/"); // Redirect to home page
        } catch (error) {
            alert(error.response.data.message);
            navigate("/"); 
        }
    };

    return (
        <div className="voting">
            <h1>Vote Here</h1>
            <div className="input-feild">
                <select onChange={(e) => setSelectedHeadBoy(e.target.value)}>
                    <option value="">Select Head Boy</option>
                    {candidates.filter(c => c.category === "headboy").map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>

                <select onChange={(e) => setSelectedHeadGirl(e.target.value)}>
                    <option value="">Select Head Girl</option>
                    {candidates.filter(c => c.category === "headgirl").map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleVote}>Vote</button>
        </div>
    );
};

export default Voting;


    