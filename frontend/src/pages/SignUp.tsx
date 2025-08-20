import { useRef } from "react";
import Button from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const name = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
        name,
        email,
        password,
      });
      navigate("/signin");
      alert("You Have signed Up!");
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.mssg || "Signup failed!");
      } else {
        alert("Network error. Please try again!");
      }
      console.error("Signup error:", error);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <Input ref={usernameRef} placeholder="Username" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input ref={emailRef} placeholder="Email" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <Input ref={passwordRef} placeholder="Password" />
        </div>
        <div className="pt-4 flex justify-center mb-2 ">
          <Button variant="primary" text="Signup" onClick={signup} />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
