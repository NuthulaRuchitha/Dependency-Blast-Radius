import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

<div className="history-header">
  <Link to="/">
    <button className="back-btn">
      ← Back to Dashboard
    </button>
  </Link>

  <h1 className="history-title">
    Simulation History
  </h1>
</div>

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/history"
      );

      setHistory(res.data);
    };

    fetchHistory();
  }, []);

    return (
    <div className="app-container">

        <div className="history-header">
        <Link to="/">
            <button className="back-btn">
            ← Back to Dashboard
            </button>
        </Link>

        <h1 className="history-title">
            Simulation History
        </h1>
        </div>

        {history.map((item) => (
        <div
            key={item._id}
            className="history-card"
        >
            <div className="history-card-header">
            <h3>
                {item.failedServiceId?.name}
            </h3>

            <span
                className={`history-badge ${
                item.impactLevel === "HIGH"
                    ? "high-impact"
                    : item.impactLevel === "MEDIUM"
                    ? "medium-impact"
                    : "low-impact"
                }`}
            >
                {item.impactLevel}
            </span>
            </div>

            <div className="history-grid">
            <div>
                <span>Impacted Services</span>
                <h2>{item.impactedCount}</h2>
            </div>

            <div>
                <span>Severity Score</span>
                <h2>{item.severityScore}</h2>
            </div>
            </div>

            <p className="history-time">
            {new Date(
                item.createdAt
            ).toLocaleString()}
            </p>
        </div>
        ))}
    </div>
    );
}

export default History;