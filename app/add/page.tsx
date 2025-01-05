// app/add/page.tsx

'use client';

import React, { useState } from 'react';

const Add = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!question.trim() || !answer.trim()) {
      setMessage('Please fill in both question and answer.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/addFlashcard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer }),
      });

      if (res.ok) {
        setMessage('Flashcard added successfully!');
        setQuestion('');
        setAnswer('');
      } else {
        const errorText = await res.text();
        setMessage(`Error: ${errorText || 'Something went wrong'}`);
      }
    } catch (error) {
      setMessage('Network error: Failed to add flashcard.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Flashcard</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Question:</label>
        <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-600 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Answer:</label>
        <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
        className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md align-top"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-4/5 py-2 px-4 rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isLoading ? 'Adding...' : 'Add Flashcard'}
        </button>
      </div>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
};

export default Add;
