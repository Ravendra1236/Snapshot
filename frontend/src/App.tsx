import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SharedContent from "./pages/SharedContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route
          path="/shared/:shareLink"
          element={<SharedContent></SharedContent>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
