import { Navbar } from "./components";
import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="bg-[#f8f9fa] h-[calc(100vh-5.5rem)] overflow-hidden">
        <div className="container mx-auto w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
