import { useState } from "react";
import axios from "axios";

function CreateDependency({
  services,
  onDependencyCreated,
}) {
  const [sourceService, setSourceService] =
    useState("");

  const [targetService, setTargetService] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/dependencies",
        {
          sourceService,
          targetService,
        }
      );

      alert("Dependency created!");

      setSourceService("");
      setTargetService("");

      onDependencyCreated();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create dependency"
      );
    }
  };

  return (
    <div className="create-service-card">
      <h2>Create Dependency</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={sourceService}
          onChange={(e) =>
            setSourceService(e.target.value)
          }
          required
        >
          <option value="">
            Source Service
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

        <select
          value={targetService}
          onChange={(e) =>
            setTargetService(e.target.value)
          }
          required
        >
          <option value="">
            Target Service
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

        <button type="submit">
          Create Dependency
        </button>
      </form>
    </div>
  );
}

export default CreateDependency;