import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./History.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/history"
        );

        setHistory(res.data);
      } catch (error) {
        console.error(error);
      }
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

      <div className="history-grid">
        {history.map((item) => (
          <div
            key={item._id}
            className="history-card"
          >
            <h3 className="service-name">
              🔥 {item.failedServiceId?.name}
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

            <div className="history-stats">
              <div>
                <strong>
                  {item.impactedCount}
                </strong>
                <p>Impacted Services</p>
              </div>

              <div>
                <strong>
                  {item.severityScore}
                </strong>
                <p>Severity Score</p>
              </div>
            </div>

            <p className="history-time">
              🕒{" "}
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;