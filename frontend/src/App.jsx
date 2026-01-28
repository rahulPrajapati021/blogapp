import { BrowserRouter, Route, Routes } from "react-router";
import PublicHomePage from "./pages/Public/PublicHomePage";
import LoginPage from "./pages/Public/LoginPage";
import RegisterPage from "./pages/Public/RegisterPage";
import ReadPost from "./pages/Public/ReadPost";
import EditProfile from "./pages/Private/EditProfile";
import ProtectedRoute from "./components/App/ProtectedRoute";
import UserDashboard from "./pages/Private/UserDashboard";
import CreatePost from "./pages/Private/CreatePost";
import EditPost from "./pages/Private/EditPost";
import UserProfile from "./pages/Public/UserProfile";
import NotFound from "./components/App/NotFound";
import { AuthProvider } from "./context/AuthContext";
import LogoutUser from "./components/App/LogoutUser";

function AppComponent() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post/:id" element={<ReadPost />} />
          <Route path="/user/:id" element={<UserProfile />} />

          {/* Protected Routes */}
          <Route
            path="/editPofile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createPost"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editPost/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userdashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logoutUser"
            element={
              <ProtectedRoute>
                <LogoutUser />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <AuthProvider>
        <AppComponent />
      </AuthProvider>
    </div>
  );
}
