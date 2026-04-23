import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const token = localStorage.getItem("token");

  // protect route
  if (!token) {
    window.location.href = "/login";
  }

  const fetchData = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/grievances",
      { headers: { Authorization: token } }
    );
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addGrievance = async () => {
    await axios.post(
      "http://localhost:5000/api/grievances",
      {
        title,
        description: desc,
        category: "Other"
      },
      { headers: { Authorization: token } }
    );

    setTitle("");
    setDesc("");
    fetchData();
  };

  const deleteGrievance = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/grievances/${id}`,
      { headers: { Authorization: token } }
    );
    fetchData();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button onClick={addGrievance}>Submit</button>
      <button onClick={logout}>Logout</button>

      <ul>
        {grievances.map((g) => (
          <li key={g._id}>
            {g.title} - {g.status}
            <button onClick={() => deleteGrievance(g._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}