import React, { useState, useEffect } from 'react';

const ChatBox = ({ messages }) => {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setIsUpdated(true);
    const timeoutId = setTimeout(() => {
      setIsUpdated(false);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  return (
    <div className={`chat-box ${isUpdated ? 'updated' : ''}`}>
      {messages.map((msg, index) => (
        <div key={index} className={`message msg-${msg.sender}`}>
          <span>{msg.sender === 'ai' ? 'AI Interviewer' : 'You'}</span>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
