import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://student-grievance-system-tgtn.onrender.com/api/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={(e) => setForm({...form, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({...form, password: e.target.value})} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}