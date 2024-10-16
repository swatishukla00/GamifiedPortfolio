'use client'; // Add this line to make the component a Client Component

import { useState } from "react";
import Image from "next/image";
import bg from "../../public/background/home-background.png";
import RenderModel from "@/components/RenderModel";
import Navigation from "@/components/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Girl = dynamic(() => import("@/components/models/Girl"), {
  ssr: false,
});

// Rock, Paper, Scissors Game Logic
const choices = ["Rock", "Paper", "Scissors"];
const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

export default function Home() {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (choice) => {
    const computer = getRandomChoice();
    setUserChoice(choice);
    setComputerChoice(computer);

    // Determine winner
    if (choice === computer) {
      setResult("It's a tie!");
    } else if (
      (choice === "Rock" && computer === "Scissors") ||
      (choice === "Scissors" && computer === "Paper") ||
      (choice === "Paper" && computer === "Rock")
    ) {
      setResult("You win!");
    } else {
      setResult("You lose!");
    }
  };

  const openGameLinks = () => {
    const links = [
      "http://192.168.56.1:8080",
      "http://192.168.96.159:8080",
      "http://127.0.0.1:8080"
    ];
    links.forEach(link => window.open(link, "_blank"));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Image
        priority
        sizes="100vw"
        src={bg}
        alt="background-image"
        fill
        className="-z-50 w-full h-full object-cover object-center opacity-50"
      />

      {/* Add greeting text in top-left */}
      <div className="absolute top-5 left-5">
        <h1 className="text-yellow-400 text-2xl font-medium">Hii there, this side</h1>
        <h1 className="text-white text-5xl font-bold drop-shadow-lg">Swati Shukla</h1>
      </div>

      <div className="w-full h-screen relative">
        <Navigation />
        <RenderModel>
          <Girl />
        </RenderModel>

        {/* Description above the button */}
        <div className="absolute right-12 transform -translate-x-1/2 bottom-4 text-center bg-gray-800 bg-opacity-50 p-4 rounded">
          <p className="text-white">
            Wanna look at my gamified portfolio? Click here &#8594;
          </p>
        </div>

        {/* Bouncing Button centered below the Girl model */}
        <motion.button
          onClick={openGameLinks}
          className="transform -translate-x-1/2 absolute right-12 bottom-5 bg-blue-500 text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          Click here to play
        </motion.button>
      </div>

      {/* Simple Rock, Paper, Scissors Game */}
      <div className="absolute bottom-10 left-5 flex flex-col items-center">
        <h2 className="text-3xl text-white mb-4">Rock, Paper, Scissors</h2>
        <div className="flex space-x-4 mb-4">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleClick(choice)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            >
              {choice}
            </button>
          ))}
        </div>
        {userChoice && (
          <div className="text-white">
            <p>You chose: {userChoice}</p>
            <p>Computer chose: {computerChoice}</p>
            <h3 className="text-2xl font-bold">{result}</h3>
          </div>
        )}
      </div>
    </main>
  );
}
