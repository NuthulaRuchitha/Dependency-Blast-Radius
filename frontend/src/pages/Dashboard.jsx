import { useEffect, useState } from "react";
import axios from "axios";
import ReactFlow, {Controls, Background,} from "reactflow";
import { Link } from "react-router-dom";
import "reactflow/dist/style.css";
import "../App.css";

const DashboardCard = ({
  title,
  value,
  className,
}) => (
  <div className={`stat-card ${className}`}>
    <h3>{title}</h3>
    <div className="stat-number">{value}</div>
  </div>
);

function Dashboard() {
  const [services, setServices] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [simulationResult, setSimulationResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const servicesRes = await axios.get(
          "http://localhost:5000/api/services"
        );

        const dependenciesRes = await axios.get(
          "http://localhost:5000/api/dependencies"
        );

        setServices(servicesRes.data);
        setDependencies(dependenciesRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const simulateFailure = async () => {
    if (!selectedService) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/simulate",
        {
          failedServiceId: selectedService,
        }
      );

      setSimulationResult(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getImpactClass = (level) => {
    if (level === "HIGH") return "high-impact";
    if (level === "MEDIUM") return "medium-impact";
    return "low-impact";
  };

  const getCriticalityClass = (criticality) => {
    if (criticality === "HIGH")
      return "high-criticality";

    if (criticality === "MEDIUM")
      return "medium-criticality";

    return "low-criticality";
  };

  const nodePositions = {
    "Auth Service": { x: 250, y: 50 },
    "Payment Service": { x: 250, y: 150 },
    "Notification Service": { x: 250, y: 250 },
    "User Service": { x: 50, y: 150 },
  };

  const nodes = services.map((service) => ({
    id: service._id,
    data: {
      label: service.name,
    },
    position:
      nodePositions[service.name] || {
        x: 250,
        y: 100,
      },
      draggable: false,
  }));

  const edges = dependencies.map((dep) => ({
    id: dep._id,
    source: dep.sourceService._id,
    target: dep.targetService._id,
    animated: true,
  }));
  const healthyServices = services.filter(
    (service) => service.status === "HEALTHY"
  ).length;

  const failedServices = services.filter(
    (service) => service.status === "FAILED"
  ).length;

  const highCriticalityServices = services.filter(
    (service) => service.criticality === "HIGH"
  ).length;

  return (
    <div className="app-container">
      <h1 className="dashboard-title">
        Dependency Blast Radius Dashboard
      </h1>

      <br/>

      <p className="dashboard-subtitle">
        Analyze service dependencies and simulate
        failure impact across your architecture
      </p>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/history">
            <button className="simulate-btn">
            View Simulation History
            </button>
        </Link>
      </div>

      <div className="stats-container">
        <DashboardCard
          title="Total Services"
          value={services.length}
          className="services-card"
        />

        <DashboardCard
          title="Dependencies"
          value={dependencies.length}
          className="dependencies-card"
        />

        <DashboardCard
          title="Last Impact"
          value={simulationResult?.impactedCount || 0}
          className="impact-card"
        />
      </div>

      <h2>Service Health Overview</h2>

      <div className="stats-container">
        <DashboardCard
          title="Healthy Services"
          value={healthyServices}
          className="healthy-card"
        />

        <DashboardCard
          title="Failed Services"
          value={failedServices}
          className="failed-card"
        />

        <DashboardCard
          title="High Criticality"
          value={highCriticalityServices}
          className="critical-card"
        />
      </div>
      <div className="search-container">
        <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) =>
            setSearchTerm(e.target.value)
            }
            className="search-input"
        />
        </div>
        <br />

      <h2>Registered Services</h2>

      <div className="services-grid">
        {services
        .filter((service) =>
            service.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((service) => (
            <div
            key={service._id}
            className="service-card"
            >
            <h3>{service.name}</h3>

            <p>Owner: {service.owner}</p>

            <p>
                Criticality:
                <span
                className={`criticality-badge ${getCriticalityClass(
                    service.criticality
                )}`}
                >
                {service.criticality}
                </span>
            </p>
            </div>
        ))}
        </div>

      

      <h2>Service Dependency Graph</h2>

      <div
        className="graph-container"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
        >
          <Controls />
          <Background />
        </ReactFlow>
        
      </div>

      <h2>Failure Simulation</h2>

      <select
        value={selectedService}
        onChange={(e) =>
          setSelectedService(e.target.value)
        }
      >
        <option value="">
          Select Service
        </option>

        {services.map((service) => (
          <option
            key={service._id}
            value={service._id}
          >
            {service.name}
          </option>
        ))}
      </select>

      <button
        className="simulate-btn"
        onClick={simulateFailure}
      >
        Simulate
      </button>

      {simulationResult && (
        <div className="simulation-card">
          <h2 className="result-header">
            🔥 Simulation Result
          </h2>

          <div className="result-grid">
            <div className="result-item">
              <div className="result-label">
                Impacted Services
              </div>
              <div className="result-value">
                {simulationResult.impactedCount}
              </div>
            </div>

            <div className="result-item">
              <div className="result-label">
                Severity Score
              </div>
              <div className="result-value">
                {simulationResult.severityScore}
              </div>
            </div>

            <div className="result-item">
              <div className="result-label">
                Impact Level
              </div>

              <div
                className={getImpactClass(
                  simulationResult.impactLevel
                )}
              >
                {simulationResult.impactLevel}
              </div>
            </div>
          </div>

          <div className="impacted-list">
            <h3>Impacted Services</h3>

            {simulationResult.impactedServices.length === 0 ? (
              <p>✅ No impacted services</p>
            ) : (
              <div className="impacted-services-container">
                {simulationResult.impactedServices.map(
                  (service) => (
                    <div
                      key={service._id}
                      className="impacted-service-card"
                    >
                      {service.name}
                    </div>
                  )
                )}
              </div>
            )}

            <h3 style={{ marginTop: "25px" }}>
              Dependency Paths
            </h3>

            <div className="paths-container">
              {Object.entries(
                simulationResult.paths || {}
              ).map(([service, path]) => (
                <div
                  key={service}
                  className="path-card"
                >
                  <h4>{service}</h4>

                  <p>{path.join(" → ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;