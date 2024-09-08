import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/custom/shared/nav-bar";
import Footer from "./components/custom/shared/footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
