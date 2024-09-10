import { useState } from 'react';
import { sendMessageToOpenAI } from '../api/openai';

const useInterviewFlow = (onAISuccess) => {
  const [messages, setMessages] = useState([]);
	
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = async (userMessage) => {
    addMessage({ text: userMessage, sender: 'user' });

    try {
      const aiResponse = await sendMessageToOpenAI(userMessage);
      addMessage({ text: aiResponse, sender: 'ai' });

      // if (onAISuccess) {
      //   onAISuccess(); // Trigger the callback to start listening again
      // }
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      addMessage({ text: 'Error: AI could not respond.', sender: 'ai' });
    }

		if (onAISuccess) {
			onAISuccess();
		}
  };

  return { messages, sendMessage, addMessage };
};

export default useInterviewFlow;
