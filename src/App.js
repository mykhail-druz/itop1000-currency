import "./index.css";
import Aos from "aos";
import "aos/dist/aos.css";
import React from "react";
import Header from "./components/Header";
import ConverterBox from "./components/ConverterBox";

function App() {
  Aos.init({
    duration: 1800,
    offset: 100,
  });

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex items-center justify-center fixed top-0 w-full bg-gray-300 shadow-lg z-10 h-12">
        <Header />
      </div>
      <ConverterBox />
    </div>
  );
}

export default App;
