import { useState } from "react";
import axios from "axios";

function CreateService({ onServiceCreated }) {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [criticality, setCriticality] =
    useState("HIGH");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/services",
        {
          name,
          owner,
          criticality,
          status: "HEALTHY",
        }
      );

      setName("");
      setOwner("");
      setCriticality("HIGH");

      onServiceCreated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-service-card">
      <h2>Add New Service</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Service Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Owner"
          value={owner}
          onChange={(e) =>
            setOwner(e.target.value)
          }
          required
        />

        <select
          value={criticality}
          onChange={(e) =>
            setCriticality(e.target.value)
          }
        >
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">
            MEDIUM
          </option>
          <option value="LOW">LOW</option>
        </select>

        <button type="submit">
          Create Service
        </button>
      </form>
    </div>
  );
}

export default CreateService;