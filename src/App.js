import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: inputValue }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.result);
      } else {
        setResponseMessage('Error: Unable to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error: Something went wrong');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your input"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default App;
