import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/custom/shared/nav-bar";

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;
