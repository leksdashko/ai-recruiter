import { useState } from 'react';
import { sendMessageToOpenAI } from '../api/openai';

const useInterviewFlow = () => {
  const [messages, setMessages] = useState([]);
	
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = async (userMessage) => {
    addMessage({ text: userMessage, sender: 'User' });

    try {
      const aiResponse = await sendMessageToOpenAI(userMessage);
      addMessage({ text: aiResponse, sender: 'AI' });
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      addMessage({ text: 'Error: AI could not respond.', sender: 'AI' });
    }
  };

  return { messages, sendMessage, addMessage };
};

export default useInterviewFlow;
