import { useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-slate-50 min-h-screen">
        <Home></Home>
      </div>
    </>
  );
}

export default App;
