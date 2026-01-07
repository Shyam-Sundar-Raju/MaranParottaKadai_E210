import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px] p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Register</h2>

        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />

        <Button
          className="w-full"
          onClick={() => navigate("/")}
        >
          Create Account
        </Button>
      </Card>
    </div>
  );
}
