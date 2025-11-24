import React, { useState, useEffect } from 'react';

const quotes = [
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci"
  },
  {
    text: "Good design is obvious. Great design is transparent.",
    author: "Joe Sparano"
  },
  {
    text: "Design is thinking made visual.",
    author: "Saul Bass"
  },
  {
    text: "Everything is designed. Few things are designed well.",
    author: "Brian Reed"
  },
  {
    text: "Content precedes design. Design in the absence of content is not design, it's decoration.",
    author: "Jeffrey Zeldman"
  },
  {
    text: "Make it simple, but significant.",
    author: "Don Draper"
  },
  {
    text: "Design creates culture. Culture shapes values. Values determine the future.",
    author: "Robert L. Peters"
  },
  {
    text: "To design is to communicate clearly by whatever means you can control or master.",
    author: "Milton Glaser"
  },
  {
    text: "Design is intelligence made visible.",
    author: "Alina Wheeler"
  },
  {
    text: "The details are not the details. They make the design.",
    author: "Charles Eames"
  },
  {
    text: "Good design is as little design as possible.",
    author: "Dieter Rams"
  },
  {
    text: "Design is where science and art break even.",
    author: "Robin Mathew"
  },
  {
    text: "A user interface is like a joke. If you have to explain it, it's not that good.",
    author: "Martin LeBlanc"
  },
  {
    text: "Design is a solution to a problem. Art is a question to a problem.",
    author: "John Maeda"
  },
  {
    text: "You can't use up creativity. The more you use, the more you have.",
    author: "Maya Angelou"
  },
  {
    text: "Recognizing the need is the primary condition for design.",
    author: "Charles Eames"
  },
  {
    text: "Design is a funny word. Some people think design means how it looks. But of course, if you dig deeper, it's really how it works.",
    author: "Steve Jobs"
  },
  {
    text: "Every great design begins with an even better story.",
    author: "Lorinda Mamo"
  },
  {
    text: "The public is more familiar with bad design than good design.",
    author: "Paul Rand"
  },
  {
    text: "Design is a plan for arranging elements in such a way as best to accomplish a particular purpose.",
    author: "Charles Eames"
  },
  {
    text: "Have no fear of perfection—you'll never reach it.",
    author: "Salvador Dalí"
  },
  {
    text: "Design is the silent ambassador of your brand.",
    author: "Paul Rand"
  },
  {
    text: "Great design is eliminating all unnecessary details.",
    author: "Minh D. Tran"
  },
  {
    text: "The alternative to good design is always bad design. There is no such thing as no design.",
    author: "Adam Judge"
  },
  {
    text: "Design adds value faster than it adds costs.",
    author: "Joel Spolsky"
  },
  {
    text: "If you think good design is expensive, you should look at the cost of bad design.",
    author: "Ralf Speth"
  },
  {
    text: "Design is not a single object or dimension. Design is messy and complex.",
    author: "Natasha Jen"
  }
];

export default function RandomQuote() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    // Select a random quote on component mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  if (!quote) return null;

  return (
    <div className="py-12 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <blockquote className="text-xl md:text-2xl text-gray-300 mb-4">
          "{quote.text}"
        </blockquote>
        <p className="text-gray-500">— {quote.author}</p>
      </div>
    </div>
  );
}