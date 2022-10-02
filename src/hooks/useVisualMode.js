import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // if (replace) {
    //   historyCopy.pop()
    // };

    // historyCopy.push(newMode)
    // setHistory(historyCopy)
    // setMode(historyCopy[historyCopy.length - 1])

    setHistory(prev => replace ? [...prev.slice(0,-1), newMode] : [...prev, newMode])
  };

  const back = () => {
    if (history.length > 1) {
     setHistory(prev => [...prev.slice(0,-1)])
    }
    // setHistory(historyCopy)
    // setMode(historyCopy[historyCopy.length - 1])
  };

  return { mode: history[history.length - 1], transition, back };
};