import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-gray-900 sticky top-0 text-white py-2 px-4 flex justify-between">
      <div id="leftSide" className="">
        <Link to="/" className="font-bold text-2xl italic">BlogApp</Link>
      </div>

      <div id="rightSide" className="flex">
        {/* if authenticated then show authenticated menus else public user menu */}
        {isAuthenticated ? <AuthenticatedNavMenu /> : <PublicNavMenu />}
      </div>
    </div>
  );
}

function AuthenticatedNavMenu() {
  return (
    <div className="flex">
      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/userdashboard">Home</Link>
        </li>
        <li>
          <Link to="">Categories</Link>
        </li>
        <li>
          <Link to="">Tags</Link>
        </li>
        <li>
          <Link to="">Add Post</Link>
        </li>
        <li>
          <Link to="">User</Link>
        </li>
      </ul>
    </div>
  );
}
function PublicNavMenu() {
  return (
    <div className="flex">
      <ul className="flex space-x-4 items-center">
        <li>
          <Link className="underline text-orange-400" to="/login">Login</Link>
        </li>
        <li>or</li>
        <li>
          <Link className="underline text-orange-400" to="/register">Register</Link>
        </li>
        <li>
          <Link to="">About</Link>
        </li>
      </ul>
    </div>
  );
}
