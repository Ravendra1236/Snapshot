import Button from "../components/Button";
import { Input } from "../components/Input";

function SignUp() {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <div className="pt-4 flex justify-center mb-2 ">
          <Button variant="primary" text="Signup" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
