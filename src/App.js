import { useState } from "react";
import './App.css';
import Dashboard from './components/Dashboard.js';
import ThemeContext from "./context/ThemeContext.js";

function App() {
  const[darkMode, setDarkMode] = useState(false);
  return (
  <ThemeContext.Provider value={{darkMode, setDarkMode}}> 
      <Dashboard/>
  </ThemeContext.Provider> 
  );
}

export default App;
