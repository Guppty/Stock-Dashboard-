import { useState } from "react";
import './App.css';
import Dashboard from './components/Dashboard.js';
import ThemeContext from "./context/ThemeContext.js";
import StockContext from "./context/StockContext.js";

function App() {
  const[darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("FB");
  return (
  <ThemeContext.Provider value={{darkMode, setDarkMode}}> 
      <StockContext.Provider value={{stockSymbol,setStockSymbol}}>
      <Dashboard/>
      </StockContext.Provider>
  </ThemeContext.Provider> 
  );
}

export default App;
