import { useState } from 'react';
import { sendMessageToOpenAI } from '../api/openai';
import { generateVoice } from '../api/11labs';

const useInterviewFlow = (onAISuccess) => {
  const [messages, setMessages] = useState([]);
	
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = async (userMessage) => {
    addMessage({ text: userMessage, sender: 'user' });

    try {
      const aiResponse = await sendMessageToOpenAI(userMessage);

			// const aiResponse = 'It is the response from AI';

			generateVoice(aiResponse, () => {
				addMessage({ text: aiResponse, sender: 'ai' });

				onAISuccess();
			});
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
      addMessage({ text: 'Error: AI could not respond.', sender: 'ai' });
    }
  };

  return { messages, sendMessage, addMessage };
};

export default useInterviewFlow;
