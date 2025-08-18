import { useRef } from "react";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signin() {
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;

    try {
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        email,
        password,
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");

      alert("You Have signed In!");
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(
          error.response.data.mssg || "Signin failed! Wrong email or password!"
        );
      } else {
        alert("Network error. Please try again!");
      }
      console.error("Signin error:", error);
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input ref={emailRef} placeholder="Email" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className="pt-4 flex justify-center mb-2 ">
          <Button variant="primary" text="Signin" onClick={signin} />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
