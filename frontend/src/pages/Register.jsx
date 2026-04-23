import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    try {
      await axios.post("https://student-grievance-system-tgtn.onrender.com/api/register", form);
      alert("Registered successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name"
        onChange={(e) => setForm({...form, name: e.target.value})} />

      <input placeholder="Email"
        onChange={(e) => setForm({...form, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({...form, password: e.target.value})} />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}