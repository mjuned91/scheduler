import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  let historyCopy = [...history];

  const transition = (newMode, replace = false) => {
    if (replace) {
      historyCopy.pop()
    };

    historyCopy.push(newMode)
    setHistory(historyCopy)
    setMode(historyCopy[historyCopy.length - 1])
  };

  const back = () => {
    if (historyCopy.length > 1) {
      historyCopy.pop()
    }
    setHistory(historyCopy)
    setMode(historyCopy[historyCopy.length - 1])
  };

  return { mode, transition, back };
};