import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode,setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (!replace)
    setHistory(prev => [...prev, newMode]);
    else setHistory(prev => [...prev.slice(0,-1), newMode])
  }

  function back() {
    if (history.length <= 1) return;
    setMode(history[history.length - 2]);
    setHistory(prev => [...prev.slice(0,-1)]);
  }

  return {
    mode,
    transition,
    back
  };
}
