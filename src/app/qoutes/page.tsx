"use client"

import { useState } from "react";

const QuoteGenerator = () => {
    const quotes = ["Keep going!", "You got this!", "React is fun!"];
    const [quote, setQuote] = useState(quotes[0]);
  
    const getRandomQuote = () => {
      const index = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[index]);
    };
  
    return (
      <div>
        <p>{quote}</p>
        <button onClick={getRandomQuote}>New Quote</button>
      </div>
    );
  };

  export default QuoteGenerator
  