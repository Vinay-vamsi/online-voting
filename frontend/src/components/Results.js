import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Results.css";

function Results() {
  const [results, setResults] = useState([]);
  const [password, setPassword] = useState("");
  const [showResults, setShowResults] = useState(false);
  const correctPassword = "admin123"; // Set your actual password here

  useEffect(() => {
    if (showResults) {
      axios
        .get("http://localhost:5000/api/results") // API call to fetch results
        .then((response) => {
          // Get only first 2 Head Boy & first 2 Head Girl candidates
          const filteredResults = response.data
            .filter((candidate) => candidate.category === "headboy")
            .slice(0, 2) // Take only first 2 headboys
            .concat(
              response.data
                .filter((candidate) => candidate.category === "headgirl")
                .slice(0, 2) // Take only first 2 headgirls
            );

          setResults(filteredResults);
        })
        .catch((error) => console.error("Error fetching results:", error));
    }
  }, [showResults]);

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setShowResults(true);
    } else {
      alert("❌ Incorrect password!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "-200px", fontSize: "30px" }}>
      {!showResults ? (
        <div>
          <h2>🔒 Enter Password to View Results</h2>
          <div className="password">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" className="text-feild"/>
            <button onClick={handlePasswordSubmit} className="btn">Submit</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="h2">🏆 Election Results</h2>
          <ul>
            {results.map((candidate) => (
              <li key={candidate._id}>
                {candidate.name} - Votes: {candidate.votes}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Results;









