import React from 'react';

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className={`message msg-${msg.sender}`}>
					<span>{msg.sender == 'ai' ? 'AI Interviewer' : 'You'}</span>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
