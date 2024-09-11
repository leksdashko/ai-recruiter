const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = process.env.REACT_APP_OPENAI_API_URL;

const handleError = (response) => {
  if (response.status === 429) {
    return Promise.reject('Rate limit exceeded. Please try again later.');
  } else if (response.status >= 400 && response.status < 500) {
    return response.json().then((data) => {
      const errorMessage = data.error?.message || 'Client error occurred.';
      return Promise.reject(errorMessage);
    });
  } else if (response.status >= 500) {
    return Promise.reject('Server error. Please try again later.');
  } else {
    return Promise.reject('An unknown error occurred.');
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
        messages: [
          {
            role: 'system',
            content: `You are a professional job interviewer conducting an interview for a role based on the provided job description. Start by greeting the candidate. Then, ask questions relevant to the job description, focusing on key skills, experience, and responsibilities outlined. Ask one question at a time and wait for the candidate to respond before proceeding to the next question. Provide follow-up questions or clarifications if needed, and maintain a professional yet friendly tone throughout the conversation. Ensure the interview is structured, covering technical and leadership aspects, as well as any specific qualifications mentioned in the job description.`
          },
          {
            role: 'user',
            content: `Here is the job description: ${jobDescription}`
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
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
        messages: [
          {
            role: 'user',
            content: `Continue the conversation: ${message}`
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
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
