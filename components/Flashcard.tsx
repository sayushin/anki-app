"use client"
import {useState} from "react";

type FlashcardProps = {
    question:string;
    answer:string;
    checkbox:boolean;
}

const Flashcard: React.FC<FlashcardProps>  = ({question, answer, checkbox}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => setIsFlipped(!isFlipped);

    const [isMarked, setIsMarked] = useState(false);

    const handleCheckboxChange = () => setIsMarked(!isMarked);

    return(
        <div className="w-full">
        <div
        onClick = {handleFlip}
        className = "relative w-full max-w-lg h-48 mx-auto cursor-pointer preserve-3d perspective"
        >
    {/* Front of the card */}
        <div
            className={`absolute w-full h-full bg-white rounded-lg shadow-md flex items-center justify-center backface-hidden transform transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : 'rotate-y-0'}`}>
            <h3 className = "text-lg font-medium">{question}</h3>
        </div>
    {/* Back of the card */}
    <div
    className = {`absolute w-full h-full bg-blue-500 text-white rounded-lg shadow-md flex items-center justify-center backface-hidden transform transition-transform duration-500 
    ${isFlipped ? "rotate-y-0" : "-rotate-y-180"}`}>
        <h3 className="text-lg font-medium">{answer}</h3>
    </div>
               
    </div>
     {/* Checkbox for marking unknown words */}
     <div className="relative mt-4 flex items-center justify-center">
     <label className="flex items-center space-x-2">
       <input
         type="checkbox"
         checked={checkbox}
         onChange={handleCheckboxChange}
         className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
       />
       <span className="text-sm">
         I don’t know this word
       </span>
     </label>
   </div>
   </div>
    );
}

export default Flashcard;