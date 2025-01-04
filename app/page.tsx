'use client'

import {useState} from 'react';
import Flashcard from "../components/Flashcard";
import Link from 'next/link';
import flashcards from '@/data/placeholder-data';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

const handleNext = () =>{
  setCurrentIndex((prevIndex)=>
   prevIndex + 1 === flashcards.length ? 0 : prevIndex + 1
);
}

const handlePrev = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
  );
}


return (
  <div className = "flex flex-col items-center p-8 min-w-md">
    <h1 className = "text-3xl font-bold mb-8">Flashcards</h1>
  <Flashcard
    question = {flashcards[currentIndex].question}
    answer = {flashcards[currentIndex].answer}
    />
    <div className="flex space-x-4 mt-6">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
      <Link href ="/add" className = "mt-12 px-4 py-2 bg-green-500 text-white rounded hover-bg-green-600">
      Add New Flashcard
      </Link>
    </div>
)

}

export default Home;