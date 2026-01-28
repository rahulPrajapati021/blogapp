import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { apiService } from "../../service/apiService";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.login(email, password);
    console.log(response);
    if(response.token) {
      login({}, response.token);
      navigator("/userdashboard")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-xl flex space-y-4 flex-col bg-slate-600 p-4 text-white rounded-lg">
      <legend className="text-center text-2xl font-bold py-3">Login to your Account</legend>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter Email"
        className="border-2 rounded-md px-4 py-2 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter Password"
        className="border-2 rounded-md px-4 py-2 outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="flex justify-center">
      <input type="submit" value="Login" className="border-2 inline-block px-4 py-2 rounded-md cursor-pointer" />
      </div>

      <div className="text-center">
        <p>New to blog post, <Link to={"/register"} className="text-blue-300">register here</Link> </p>
      </div>
    </form>
  );
}
