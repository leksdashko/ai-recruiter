const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = process.env.REACT_APP_OPENAI_API_URL;

const handleError = (response) => {
  if (response.status === 429) {
    return Promise.reject('Rate limit exceeded. Please try again later.');
  } else {
    return response.json().then((data) => {
      const errorMessage = data.error?.message || 'An unknown error occurred.';
      return Promise.reject(errorMessage);
    });
  }
};

export const sendJobDescriptionToOpenAI = async (jobDescription) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
				messages: [{"role": "user", "content": "Let's imagine that you are real interviewer and you must nalyze this job description ask the candidate relevant questions. Ask questions one by one. Wait the user answer to ask next question: " + jobDescription}],
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      return handleError(response);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response from AI.';
  } catch (error) {
    console.error('Error sending job description to OpenAI:', error);
    throw error;
  }
};

export const sendMessageToOpenAI = async (message) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
				messages: [{"role": "user", "content": "Continue the conversation: " + message}],
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      return handleError(response);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response from AI.';
  } catch (error) {
    console.error('Error sending message to OpenAI:', error);
    throw error;
  }
};