import React, { useState, FormEvent, ChangeEvent } from 'react';
import './index.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [system, setSystem] = useState('');
  const [properties, setProperties] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages((messages) => [...messages, userMessage]);
    setInputValue('');

    fetch('http://localhost:8080/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [...messages, userMessage],
        system: system,
        properties: properties,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const llmmMessage: Message = { role: 'assistant', content: data.message };
        setMessages((messages) => [...messages, llmmMessage]);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="App bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-2/3 p-8 shadow-lg h-screen">
        <h1 className="text-3xl font-semibold mb-6">Chat with LLMM</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex mb-2">
            <input
              className="flex-grow p-2 mr-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Type your message here"
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none"
              type="submit"
            >
              Send
            </button>
          </div>
          <div className="flex mb-2">
            <label htmlFor="system" className="w-1/3 font-semibold">
              System:
            </label>
            <input
              id="system"
              className="flex-grow p-2 ml-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              type="text"
              value={system}
              onChange={(e) => setSystem(e.target.value)}
            />
          </div>
          <div className="flex">
            <label htmlFor="properties" className="w-1/3 font-semibold">
              Properties:
            </label>
            <input
              id="properties"
              className="flex-grow p-2 ml-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              type="text"
              value={properties}
              onChange={(e) => setProperties(e.target.value)}
            />
          </div>
        </form>
        <div className="messages overflow-y-auto h-64 mb-4 p-4 bg-gray-200 rounded h-5/6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.role === 'user' ? 'text-right' : ''
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;