import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userMessage: inputValue })
    })
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <div className="App">
      <h1>{message}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
