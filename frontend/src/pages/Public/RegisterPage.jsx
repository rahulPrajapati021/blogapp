import { useState } from "react";
import { Link } from "react-router";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <RegisterForm />
    </div>
  );
}

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="w-xl flex space-y-4 flex-col bg-slate-600 p-4 text-white rounded-lg">
      <legend className="text-center text-2xl font-bold py-3">Create new Account</legend>
      <input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="Enter Full Name"
        min={10}
        max={100}
        className="border-2 rounded-md px-4 py-2 outline-none"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Enter Email"
        className="border-2 rounded-md px-4 py-2 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="Enter Password"
        className="border-2 rounded-md px-4 py-2 outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-center">
      <input type="submit" value="Register" className="border-2 inline-block px-4 py-2 rounded-md cursor-pointer" />
      </div>

      <div className="text-center">
        <p>Already have an account, <Link to={"/login"} className="text-blue-300">login here</Link> </p>
      </div>
    </form>
  );
}

const styles = {
  input: "border-2"
}
