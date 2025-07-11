import { Navbar } from "./components";
import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}
