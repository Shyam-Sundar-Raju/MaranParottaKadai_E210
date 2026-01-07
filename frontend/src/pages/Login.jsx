import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // TEMP: replace with API call later
    login("dummy-jwt-token");
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px] p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>

        <p className="text-sm text-center">
          New here?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
