import { useState } from "react";
import axios from "axios";

function EditService({
  service,
  onClose,
  onUpdated,
}) {
  const [formData, setFormData] =
    useState({
      name: service.name,
      owner: service.owner,
      criticality:
        service.criticality,
      status: service.status,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/services/${service._id}`,
      formData
    );

    onUpdated();
    onClose();
  };

  return (
    <div className="edit-modal">
      <form onSubmit={handleSubmit}>
        <h2>Edit Service</h2>

        <input
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          value={formData.owner}
          onChange={(e) =>
            setFormData({
              ...formData,
              owner: e.target.value,
            })
          }
        />

        <select
          value={formData.criticality}
          onChange={(e) =>
            setFormData({
              ...formData,
              criticality:
                e.target.value,
            })
          }
        >
          <option>HIGH</option>
          <option>MEDIUM</option>
          <option>LOW</option>
        </select>

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
        >
          <option>HEALTHY</option>
          <option>FAILED</option>
        </select>

        <button type="submit">
          Save
        </button>

        <button
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditService;