import axios from 'axios';

const LABS_API_KEY = import.meta.env.VITE_LABS_API_KEY;

export const generateVoicee = async (text) => {
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

export const generateVoice = async (text, callback) => {
	const voiceId = "21m00Tcm4TlvDq8ikWAM";

	const baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
	const headers = {
		"Content-Type": "application/json",
		"xi-api-key": LABS_API_KEY,
	};

	const requestBody = {
		text,
		voice_settings: {
			stability: 0,
			similarity_boost: 0,
		},
	};

	try {
		const response = await axios.post(`${baseUrl}/${voiceId}`, requestBody, {
			headers,
			responseType: "blob",
		});

		if (response.status === 200) {
			const audio = new Audio(URL.createObjectURL(response.data));

			audio.addEventListener('ended', callback);

			audio.play();
		} else {
			console.error("Error: Unable to stream audio.");
		}
	} catch (error) {
		console.error(error);
	}
}
