function SimulationHistory({ history }) {
  return (
    <div className="simulation-card">
      <h2>Simulation History</h2>

      {history.length === 0 ? (
        <p>No simulations yet</p>
      ) : (
        history.map((item) => (
          <div
            key={item._id}
            className="history-item"
          >
            <h4>
              {item.failedServiceId?.name}
            </h4>

            <p>
              Impacted:
              {item.impactedCount}
            </p>

            <p>
              Severity:
              {item.severityScore}
            </p>

            <p>
              Level:
              {item.impactLevel}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default SimulationHistory;