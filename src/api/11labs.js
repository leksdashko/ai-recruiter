import axios from 'axios';

const LABS_API_KEY = import.meta.env.LABS_API_KEY;

export const generateVoice = async (text) => {
  const response = await axios.post('https://api.11labs.io/v1/text-to-speech', {
    text: text,
    voice: 'en_us_male',
  }, {
    headers: {
      'Authorization': `Bearer ${LABS_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.audio_url;
};
